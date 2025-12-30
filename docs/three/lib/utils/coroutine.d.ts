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
export type CoroutineScheduler<T> = (coroutine: AsyncCoroutine<T>, onStep: (result: CoroutineStep<T>) => void, onError: (error: any) => void) => void;
export declare function inlineScheduler<T>(coroutine: AsyncCoroutine<T>, onStep: (result: CoroutineStep<T>) => void, onError: (error: any) => void): void;
export declare function createYieldingScheduler<T>(yieldAfterMs?: number): CoroutineScheduler<T>;
export declare function runCoroutine<T>(coroutine: AsyncCoroutine<T>, scheduler: CoroutineScheduler<T>, onSuccess: (result: T) => void, onError: (error: any) => void, abortSignal?: AbortSignal): void;
export declare function runCoroutineSync<T>(coroutine: Coroutine<T>, abortSignal?: AbortSignal): T;
export declare function runCoroutineAsync<T>(coroutine: AsyncCoroutine<T>, scheduler: CoroutineScheduler<T>, abortSignal?: AbortSignal): Promise<T>;
//# sourceMappingURL=coroutine.d.ts.map