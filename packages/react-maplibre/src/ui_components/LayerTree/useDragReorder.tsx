import React, {
	useRef,
	useCallback,
	useEffect,
	createContext,
	useContext,
	useMemo,
	useSyncExternalStore,
} from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, styled } from '@mui/material';

// ─── Public types ──────────────────────────────────────────────

export type ReorderMode = 'dnd' | 'arrows' | 'both' | 'none';

// ─── Indicator state ───────────────────────────────────────────

interface IndicatorState {
	uuid: string | null;
	half: 'top' | 'bottom' | null;
}

const EMPTY_INDICATOR: IndicatorState = { uuid: null, half: null };

// ─── Ref-based drag store (avoids React state → no cascading re-renders) ───

/**
 * Lightweight observable store scoped to a single sibling list.
 * Reads via `useSyncExternalStore` so only items whose derived
 * selector value actually changed will re-render.
 */
class DragStore {
	private _dragUuid: string | null = null;
	private _indicator: IndicatorState = EMPTY_INDICATOR;
	private _listeners = new Set<() => void>();

	subscribe = (cb: () => void) => {
		this._listeners.add(cb);
		return () => { this._listeners.delete(cb); };
	};

	private _notify() {
		this._listeners.forEach((cb) => cb());
	}

	// ── Getters ────────────────────────────────────────────────

	get dragUuid() { return this._dragUuid; }
	get indicator() { return this._indicator; }

	// ── Setters (only notify when value actually changes) ──────

	setDragUuid = (uuid: string | null) => {
		if (this._dragUuid === uuid) return;
		this._dragUuid = uuid;
		this._notify();
	};

	setIndicator = (state: IndicatorState) => {
		if (this._indicator.uuid === state.uuid && this._indicator.half === state.half) return;
		this._indicator = state;
		this._notify();
	};

	/** Reset both at once (single notification). */
	reset = () => {
		if (this._dragUuid === null && this._indicator === EMPTY_INDICATOR) return;
		this._dragUuid = null;
		this._indicator = EMPTY_INDICATOR;
		this._notify();
	};
}

// ─── Drag context (scoped per sibling list) ────────────────────

const DragContext = createContext<DragStore | null>(null);

/**
 * Wrap a sibling list with this provider so drag state is scoped
 * to only items in that list.
 */
export function DragScopeProvider({ children }: { children: React.ReactNode }) {
	// Stable store instance – never changes for the lifetime of the provider
	const storeRef = useRef<DragStore | null>(null);
	if (!storeRef.current) storeRef.current = new DragStore();

	return (
		<DragContext.Provider value={storeRef.current}>
			{children}
		</DragContext.Provider>
	);
}

// ─── Drop indicator line ───────────────────────────────────────

export const DropIndicator = styled('div')({
	height: '2px',
	background: '#1976d2',
	borderRadius: '1px',
	margin: '0 8px',
	pointerEvents: 'none',
});

// ─── Hook consumed by each draggable item ──────────────────────

export interface UseDragReorderOpts {
	uuid: string;
	/** Called when the user drops an item. */
	onReorder: (draggedUuid: string, targetUuid: string, position: 'before' | 'after') => void;
	/** Pass `false` to completely disable DnD for this item (returns no-op props). */
	enabled?: boolean;
}

/**
 * Compute which half of the row the pointer is in.
 * A dead-zone in the middle 20% sticks with the previous half to avoid jitter.
 */
function computeHalf(
	rect: DOMRect,
	clientY: number,
	previousHalf: 'top' | 'bottom' | null
): 'top' | 'bottom' {
	const ratio = (clientY - rect.top) / rect.height;
	if (ratio > 0.4 && ratio < 0.6 && previousHalf) return previousHalf;
	return ratio < 0.5 ? 'top' : 'bottom';
}

// Stable no-op objects for disabled state
const NOOP_ROW_PROPS = {};
const NOOP_HANDLE_PROPS = { enabled: false as const };
const NORMAL_STYLE: React.CSSProperties = { opacity: 1 };
const DRAGGING_STYLE: React.CSSProperties = { opacity: 0.4 };

/**
 * Per-item snapshot. Reference-stable when nothing changed for
 * *this* item, so `useSyncExternalStore` skips the re-render.
 */
interface ItemDragSnapshot {
	isDragging: boolean;
	showAbove: boolean;
	showBelow: boolean;
}

const SNAPSHOT_IDLE: ItemDragSnapshot = { isDragging: false, showAbove: false, showBelow: false };

/** Noop subscribe for when there's no provider (never fires). */
const NOOP_SUBSCRIBE = (_cb: () => void) => () => {};
const NOOP_SNAPSHOT = () => SNAPSHOT_IDLE;

export function useDragReorder({ uuid, onReorder, enabled = true }: UseDragReorderOpts) {
	const store = useContext(DragContext);
	const rowRef = useRef<HTMLLIElement | null>(null);
	const handleRef = useRef<HTMLButtonElement | null>(null);

	// Mutable ref for dead-zone hysteresis (never triggers renders)
	const lastHalfRef = useRef<'top' | 'bottom' | null>(null);

	// Touch-drag bookkeeping
	const touchRef = useRef<{ active: boolean }>({ active: false });

	// ── Subscribe only to the slice relevant to this uuid ──────

	// Keep previous snapshot ref-stable when values haven't changed
	const prevSnapshotRef = useRef<ItemDragSnapshot>(SNAPSHOT_IDLE);

	const getSnapshot = useCallback((): ItemDragSnapshot => {
		if (!store) return SNAPSHOT_IDLE;
		const dragUuid = store.dragUuid;
		const ind = store.indicator;

		// Track hysteresis
		if (ind.uuid === uuid) {
			lastHalfRef.current = ind.half;
		}

		const isDragging = dragUuid === uuid;
		const isOverThis = ind.uuid === uuid && dragUuid !== null && dragUuid !== uuid;
		const showAbove = isOverThis && ind.half === 'top';
		const showBelow = isOverThis && ind.half === 'bottom';

		const prev = prevSnapshotRef.current;
		if (
			prev.isDragging === isDragging &&
			prev.showAbove === showAbove &&
			prev.showBelow === showBelow
		) {
			return prev; // same reference → no re-render
		}
		const next: ItemDragSnapshot = { isDragging, showAbove, showBelow };
		prevSnapshotRef.current = next;
		return next;
	}, [store, uuid]);

	const subscribe = store?.subscribe ?? NOOP_SUBSCRIBE;
	const snapshotFn = store ? getSnapshot : NOOP_SNAPSHOT;

	const { isDragging, showAbove: showIndicatorAbove, showBelow: showIndicatorBelow } =
		useSyncExternalStore(subscribe, snapshotFn, snapshotFn);

	// ── HTML5 DnD (desktop) ────────────────────────────────────
	// All handlers read from `store` imperatively — zero deps on
	// React state → stable references, never invalidate React.memo.

	const handleDragStart = useCallback(
		(e: React.DragEvent) => {
			if (!store) return;
			store.setDragUuid(uuid);
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', uuid);
			if (rowRef.current) {
				e.dataTransfer.setDragImage(rowRef.current, 0, 0);
			}
		},
		[uuid, store]
	);

	const handleDragOver = useCallback(
		(e: React.DragEvent) => {
			if (!store) return;
			const dragUuid = store.dragUuid;
			if (dragUuid === null || dragUuid === uuid) return;
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const half = computeHalf(rect, e.clientY, lastHalfRef.current);
			store.setIndicator({ uuid, half });
		},
		[uuid, store]
	);

	const handleDragLeave = useCallback(
		(e: React.DragEvent) => {
			if (!store) return;
			const row = rowRef.current;
			if (row && e.relatedTarget instanceof Node && row.contains(e.relatedTarget)) return;
			if (store.indicator.uuid === uuid) {
				store.setIndicator(EMPTY_INDICATOR);
			}
		},
		[uuid, store]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			if (!store) return;
			e.preventDefault();
			const dragUuid = store.dragUuid;
			if (!dragUuid || dragUuid === uuid) return;
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const half = computeHalf(rect, e.clientY, lastHalfRef.current);
			onReorder(dragUuid, uuid, half === 'top' ? 'before' : 'after');
			store.reset();
		},
		[uuid, onReorder, store]
	);

	const handleDragEnd = useCallback(() => {
		store?.reset();
	}, [store]);

	// ── Touch events (mobile) ──────────────────────────────────

	const handleTouchStart = useCallback(
		(e: TouchEvent) => {
			if (!store) return;
			e.preventDefault();
			touchRef.current.active = true;
			store.setDragUuid(uuid);
		},
		[uuid, store]
	);

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!store) return;
			if (!touchRef.current.active || store.dragUuid !== uuid) return;
			e.preventDefault();
			const touch = e.touches[0];
			const el = document.elementFromPoint(touch.clientX, touch.clientY);
			if (!el) {
				if (store.indicator.uuid !== null) store.setIndicator(EMPTY_INDICATOR);
				return;
			}
			const target = (el as HTMLElement).closest?.('[data-drag-uuid]') as HTMLElement | null;
			if (!target) {
				if (store.indicator.uuid !== null) store.setIndicator(EMPTY_INDICATOR);
				return;
			}
			const targetUuid = target.getAttribute('data-drag-uuid');
			if (!targetUuid || targetUuid === uuid) {
				if (store.indicator.uuid !== null) store.setIndicator(EMPTY_INDICATOR);
				return;
			}
			const rect = target.getBoundingClientRect();
			const half = computeHalf(rect, touch.clientY, lastHalfRef.current);
			store.setIndicator({ uuid: targetUuid, half });
		},
		[uuid, store]
	);

	const handleTouchEnd = useCallback(() => {
		if (!store) return;
		if (!touchRef.current.active) return;
		touchRef.current.active = false;
		const ind = store.indicator;
		if (ind.uuid && store.dragUuid === uuid && ind.uuid !== uuid) {
			onReorder(uuid, ind.uuid, ind.half === 'top' ? 'before' : 'after');
		}
		store.reset();
	}, [uuid, onReorder, store]);

	// Attach touch listeners imperatively with { passive: false } so
	// e.preventDefault() is allowed (React synthetic events are passive by default).
	useEffect(() => {
		if (!enabled) return;
		const el = handleRef.current;
		if (!el) return;
		el.addEventListener('touchstart', handleTouchStart, { passive: false });
		el.addEventListener('touchmove', handleTouchMove, { passive: false });
		el.addEventListener('touchend', handleTouchEnd);
		return () => {
			el.removeEventListener('touchstart', handleTouchStart);
			el.removeEventListener('touchmove', handleTouchMove);
			el.removeEventListener('touchend', handleTouchEnd);
		};
	}, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

	// ── Return stable prop objects ─────────────────────────────

	const rowStyle = isDragging ? DRAGGING_STYLE : NORMAL_STYLE;

	const rowProps = useMemo(() => {
		if (!enabled) return NOOP_ROW_PROPS;
		return {
			ref: rowRef,
			'data-drag-uuid': uuid,
			onDragOver: handleDragOver,
			onDragLeave: handleDragLeave,
			onDrop: handleDrop,
			onDragEnd: handleDragEnd,
			style: rowStyle,
		};
	}, [enabled, uuid, rowStyle, handleDragOver, handleDragLeave, handleDrop, handleDragEnd]);

	const dragHandleProps = useMemo(() => {
		if (!enabled) return NOOP_HANDLE_PROPS;
		return {
			enabled: true as const,
			draggable: true,
			onDragStart: handleDragStart,
			// Touch events are attached imperatively via handleRef (passive: false)
		};
	}, [enabled, handleDragStart]);

	return {
		rowRef,
		handleRef,
		isDragging,
		showIndicatorAbove,
		showIndicatorBelow,
		dragHandleProps,
		rowProps,
	};
}

// ─── Drag handle icon ──────────────────────────────────────────

const DragHandleButton = styled(IconButton)({
	cursor: 'grab',
	padding: '2px',
	marginRight: '2px',
	touchAction: 'none',
	'&:active': { cursor: 'grabbing' },
});

export interface DragHandleProps {
	enabled: boolean;
	draggable?: boolean;
	onDragStart?: (e: React.DragEvent) => void;
}

export const DragHandle = React.memo(function DragHandle(
	props: DragHandleProps & { handleRef?: React.Ref<HTMLButtonElement> }
) {
	if (!props.enabled) return null;
	const { enabled: _enabled, handleRef, ...rest } = props;
	return (
		<DragHandleButton size="small" tabIndex={-1} ref={handleRef} {...rest}>
			<DragIndicatorIcon fontSize="small" sx={{ color: 'text.secondary' }} />
		</DragHandleButton>
	);
});
