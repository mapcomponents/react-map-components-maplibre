import React, {
	useRef,
	useCallback,
	createContext,
	useContext,
	useState,
	useEffect,
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

// ─── Drag context (scoped per sibling list) ────────────────────

interface DragContextValue {
	dragUuid: string | null;
	setDragUuid: (uuid: string | null) => void;
	indicator: IndicatorState;
	setIndicator: (state: IndicatorState) => void;
}

const DragContext = createContext<DragContextValue>({
	dragUuid: null,
	setDragUuid: () => {},
	indicator: EMPTY_INDICATOR,
	setIndicator: () => {},
});

/**
 * Wrap a sibling list with this provider so drag state is scoped
 * to only items in that list. Items in different providers cannot
 * interfere with each other.
 */
export function DragScopeProvider({ children }: { children: React.ReactNode }) {
	const [dragUuid, setDragUuid] = useState<string | null>(null);
	const [indicator, setIndicator] = useState<IndicatorState>(EMPTY_INDICATOR);

	return (
		<DragContext.Provider value={{ dragUuid, setDragUuid, indicator, setIndicator }}>
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

export function useDragReorder({ uuid, onReorder, enabled = true }: UseDragReorderOpts) {
	const { dragUuid, setDragUuid, indicator, setIndicator } = useContext(DragContext);
	const rowRef = useRef<HTMLLIElement | null>(null);

	// Mutable ref for dead-zone hysteresis
	const lastHalfRef = useRef<'top' | 'bottom' | null>(null);
	if (indicator.uuid === uuid) {
		lastHalfRef.current = indicator.half;
	}

	// Touch-drag bookkeeping (mutable, never causes renders)
	const touchRef = useRef<{ active: boolean }>({ active: false });

	const isDragging = dragUuid === uuid;
	const isOverThis = indicator.uuid === uuid && dragUuid !== null && dragUuid !== uuid;
	const showIndicatorAbove = isOverThis && indicator.half === 'top';
	const showIndicatorBelow = isOverThis && indicator.half === 'bottom';

	// ── HTML5 DnD (desktop) ────────────────────────────────────

	const handleDragStart = useCallback(
		(e: React.DragEvent) => {
			setDragUuid(uuid);
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', uuid);
			if (rowRef.current) {
				e.dataTransfer.setDragImage(rowRef.current, 0, 0);
			}
		},
		[uuid, setDragUuid]
	);

	const handleDragOver = useCallback(
		(e: React.DragEvent) => {
			if (dragUuid === null || dragUuid === uuid) return;
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const half = computeHalf(rect, e.clientY, lastHalfRef.current);
			if (indicator.uuid !== uuid || indicator.half !== half) {
				setIndicator({ uuid, half });
			}
		},
		[uuid, dragUuid, indicator, setIndicator]
	);

	const handleDragLeave = useCallback(
		(e: React.DragEvent) => {
			// Ignore leaves to child elements inside the same row
			const row = rowRef.current;
			if (row && e.relatedTarget instanceof Node && row.contains(e.relatedTarget)) return;
			if (indicator.uuid === uuid) {
				setIndicator(EMPTY_INDICATOR);
			}
		},
		[uuid, indicator, setIndicator]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			if (!dragUuid || dragUuid === uuid) return;
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const half = computeHalf(rect, e.clientY, lastHalfRef.current);
			onReorder(dragUuid, uuid, half === 'top' ? 'before' : 'after');
			setDragUuid(null);
			setIndicator(EMPTY_INDICATOR);
		},
		[dragUuid, uuid, onReorder, setDragUuid, setIndicator]
	);

	const handleDragEnd = useCallback(() => {
		setDragUuid(null);
		setIndicator(EMPTY_INDICATOR);
	}, [setDragUuid, setIndicator]);

	// ── Touch events (mobile) ──────────────────────────────────

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			// Prevent default so the browser doesn't start scrolling
			e.preventDefault();
			touchRef.current.active = true;
			setDragUuid(uuid);
		},
		[uuid, setDragUuid]
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!touchRef.current.active || dragUuid !== uuid) return;
			e.preventDefault();
			const touch = e.touches[0];
			const el = document.elementFromPoint(touch.clientX, touch.clientY);
			if (!el) {
				if (indicator.uuid !== null) setIndicator(EMPTY_INDICATOR);
				return;
			}
			const target = (el as HTMLElement).closest?.('[data-drag-uuid]') as HTMLElement | null;
			if (!target) {
				if (indicator.uuid !== null) setIndicator(EMPTY_INDICATOR);
				return;
			}
			const targetUuid = target.getAttribute('data-drag-uuid');
			if (!targetUuid || targetUuid === uuid) {
				if (indicator.uuid !== null) setIndicator(EMPTY_INDICATOR);
				return;
			}
			const rect = target.getBoundingClientRect();
			const half = computeHalf(rect, touch.clientY, lastHalfRef.current);
			if (indicator.uuid !== targetUuid || indicator.half !== half) {
				setIndicator({ uuid: targetUuid, half });
			}
		},
		[uuid, dragUuid, indicator, setIndicator]
	);

	const handleTouchEnd = useCallback(() => {
		if (!touchRef.current.active) return;
		touchRef.current.active = false;
		if (indicator.uuid && dragUuid === uuid && indicator.uuid !== uuid) {
			onReorder(uuid, indicator.uuid, indicator.half === 'top' ? 'before' : 'after');
		}
		setDragUuid(null);
		setIndicator(EMPTY_INDICATOR);
	}, [uuid, dragUuid, indicator, onReorder, setDragUuid, setIndicator]);

	// Clean up on unmount if a drag is active
	useEffect(() => {
		return () => {
			touchRef.current.active = false;
		};
	}, []);

	if (!enabled) {
		return {
			rowRef,
			isDragging: false,
			showIndicatorAbove: false,
			showIndicatorBelow: false,
			dragHandleProps: NOOP_HANDLE_PROPS,
			rowProps: NOOP_ROW_PROPS,
		};
	}

	return {
		rowRef,
		isDragging,
		showIndicatorAbove,
		showIndicatorBelow,
		dragHandleProps: {
			enabled: true as const,
			draggable: true,
			onDragStart: handleDragStart,
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
		},
		rowProps: {
			ref: rowRef,
			'data-drag-uuid': uuid,
			onDragOver: handleDragOver,
			onDragLeave: handleDragLeave,
			onDrop: handleDrop,
			onDragEnd: handleDragEnd,
			style: { opacity: isDragging ? 0.4 : 1 } as React.CSSProperties,
		},
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
	onTouchStart?: (e: React.TouchEvent) => void;
	onTouchMove?: (e: React.TouchEvent) => void;
	onTouchEnd?: (e: React.TouchEvent) => void;
}

export function DragHandle(props: DragHandleProps) {
	if (!props.enabled) return null;
	const { enabled: _enabled, ...rest } = props;
	return (
		<DragHandleButton size="small" tabIndex={-1} {...rest}>
			<DragIndicatorIcon fontSize="small" sx={{ color: 'text.secondary' }} />
		</DragHandleButton>
	);
}
