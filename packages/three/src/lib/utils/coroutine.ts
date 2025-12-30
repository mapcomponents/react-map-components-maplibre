/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 *
 * Coroutine utilities for non-blocking async operations using generators.
 * Allows long-running tasks to yield control periodically to prevent UI freezing.
 */

export type Coroutine<T> = Iterator<void, T, void> & IterableIterator<void>;
export type AsyncCoroutine<T> = Iterator<void | Promise<void>, T, void> & IterableIterator<void | Promise<void>>;
export type CoroutineStep<T> = IteratorResult<void, T>;
export type CoroutineScheduler<T> = (
    coroutine: AsyncCoroutine<T>,
    onStep: (result: CoroutineStep<T>) => void,
    onError: (error: any) => void
) => void;

export function inlineScheduler<T>(
    coroutine: AsyncCoroutine<T>,
    onStep: (result: CoroutineStep<T>) => void,
    onError: (error: any) => void
): void {
    try {
        const step = coroutine.next();

        if (step.done || !step.value) {
            onStep(step as CoroutineStep<T>);
        } else {
            (step.value as Promise<void>).then(
                () => onStep({ done: step.done, value: undefined } as CoroutineStep<T>),
                onError
            );
        }
    } catch (error) {
        onError(error);
    }
}

export function createYieldingScheduler<T>(yieldAfterMs = 25): CoroutineScheduler<T> {
    let startTime: number | undefined;

    return (coroutine, onStep, onError) => {
        const now = performance.now();

        if (startTime === undefined || now - startTime > yieldAfterMs) {
            startTime = now;
            setTimeout(() => inlineScheduler(coroutine, onStep, onError), 0);
        } else {
            inlineScheduler(coroutine, onStep, onError);
        }
    };
}

export function runCoroutine<T>(
    coroutine: AsyncCoroutine<T>,
    scheduler: CoroutineScheduler<T>,
    onSuccess: (result: T) => void,
    onError: (error: any) => void,
    abortSignal?: AbortSignal
): void {
    const resume = () => {
        let shouldContinue: boolean | undefined;

        const onStep = (result: CoroutineStep<T>) => {
            if (result.done) {
                onSuccess(result.value);
            } else if (shouldContinue === undefined) {
                shouldContinue = true;
            } else {
                resume();
            }
        };

        do {
            shouldContinue = undefined;

            if (abortSignal?.aborted) {
                onError(new DOMException('Aborted', 'AbortError'));
                return;
            }

            scheduler(coroutine, onStep, onError);

            if (shouldContinue === undefined) {
                shouldContinue = false;
            }
        } while (shouldContinue);
    };

    resume();
}

export function runCoroutineSync<T>(coroutine: Coroutine<T>, abortSignal?: AbortSignal): T {
    let result: T | undefined;

    runCoroutine(
        coroutine,
        inlineScheduler,
        (r) => { result = r; },
        (e) => { throw e; },
        abortSignal
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
}

export function runCoroutineAsync<T>(
    coroutine: AsyncCoroutine<T>,
    scheduler: CoroutineScheduler<T>,
    abortSignal?: AbortSignal
): Promise<T> {
    return new Promise((resolve, reject) => {
        runCoroutine(coroutine, scheduler, resolve, reject, abortSignal);
    });
}
