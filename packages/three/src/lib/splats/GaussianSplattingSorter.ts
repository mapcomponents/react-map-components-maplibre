/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import { Coroutine, createYieldingScheduler, runCoroutineAsync } from '../utils/coroutine';

/**
 * Radix sort-based depth sorter for Gaussian Splatting
 */
export class GaussianSplattingSorter {
    private static readonly BATCH_SIZE = 327680;
    private static workCount = 0;

    vertexCount = 0;
    positions: Float32Array | null = null;
    hasInit = false;

    splatIndex: Uint32Array | null = null;
    depthValues: Int32Array | null = null;
    tempDepths: Int32Array | null = null;
    tempIndices: Uint32Array | null = null;
    abortController: AbortController | null = null;

    onmessage: ((splatIndex: Uint32Array) => void) | null = null;

    terminate(): void {
        this.abortController?.abort();
        this.abortController = null;
        this.vertexCount = 0;
        this.positions = null;
        this.splatIndex = null;
        this.onmessage = null;
    }

    private initSortData(): void {
        if (this.hasInit || this.vertexCount < 0) return;

        const count = this.vertexCount;
        this.depthValues = new Int32Array(count);
        this.splatIndex = new Uint32Array(count);
        this.tempDepths = new Int32Array(count);
        this.tempIndices = new Uint32Array(count);
        this.hasInit = true;
    }

    private *sortData(viewProj: number[], isAsync: boolean): Coroutine<void> {
        if (!this.hasInit) this.initSortData();

        const { positions, vertexCount, depthValues, splatIndex, tempDepths, tempIndices } = this;
        if (!positions || !depthValues || !splatIndex || !tempDepths || !tempIndices) return;

        let maxDepth = -Infinity;
        let minDepth = Infinity;

        for (let i = 0; i < vertexCount; i++) {
            splatIndex[i] = i;
            const depth = viewProj[2] * positions[4 * i] + viewProj[6] * positions[4 * i + 1] + viewProj[10] * positions[4 * i + 2];
            const depthInt = Math.floor(depth * 4096);
            depthValues[i] = depthInt;
            maxDepth = Math.max(maxDepth, depthInt);
            minDepth = Math.min(minDepth, depthInt);
        }

        if (isAsync) {
            GaussianSplattingSorter.workCount += vertexCount;
            if (GaussianSplattingSorter.workCount > GaussianSplattingSorter.BATCH_SIZE) {
                GaussianSplattingSorter.workCount = 0;
                yield;
            }
        }

        const depthOffset = -minDepth;
        for (let i = 0; i < vertexCount; i++) {
            depthValues[i] += depthOffset;
        }

        const counts = new Uint32Array(256);

        for (let shift = 0; shift < 32; shift += 8) {
            counts.fill(0);

            for (let i = 0; i < vertexCount; i++) {
                counts[(depthValues[i] >> shift) & 0xff]++;
            }

            let total = 0;
            for (let i = 0; i < counts.length; i++) {
                const current = counts[i];
                counts[i] = total;
                total += current;
            }

            for (let i = 0; i < vertexCount; i++) {
                const byte = (depthValues[i] >> shift) & 0xff;
                const pos = counts[byte]++;
                tempDepths[pos] = depthValues[i];
                tempIndices[pos] = splatIndex[i];
            }

            depthValues.set(tempDepths);
            splatIndex.set(tempIndices);

            if (isAsync) {
                GaussianSplattingSorter.workCount += vertexCount;
                if (GaussianSplattingSorter.workCount > GaussianSplattingSorter.BATCH_SIZE) {
                    GaussianSplattingSorter.workCount = 0;
                    yield;
                }
            }
        }
    }

    init(positions: Float32Array, vertexCount: number): void {
        this.positions = positions;
        this.vertexCount = vertexCount;
        this.initSortData();
    }

    async sortDataAsync(viewProj: number[]): Promise<void> {
        this.abortController?.abort();
        this.abortController = new AbortController();
        const signal = this.abortController.signal;

        try {
            await runCoroutineAsync(this.sortData(viewProj, true), createYieldingScheduler(), signal);
            if (this.onmessage && this.splatIndex) {
                this.onmessage(this.splatIndex);
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== 'AbortError') {
                console.error('Splat sort error:', error);
            }
        } finally {
            this.abortController = null;
        }
    }
}
