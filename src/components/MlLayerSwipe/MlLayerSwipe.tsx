import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import syncMove from '@mapbox/mapbox-gl-sync-move';
import './style.css';
import useMap from '../../hooks/useMap';
import MapContext, { MapContextType } from '../../contexts/MapContext';
import { ReactComponent as CircleIcon } from './assets/circleIcon.svg';

export interface MlLayerSwipeProps {
	/**
	 * Id of the first MapLibre instance.
	 */
	map1Id: string;
	/**
	 * Id of the second MapLibre instance.
	 */
	map2Id: string;
	/**
	 * object (React.CSSProperties) that is added to the button default style
	 */
	buttonStyle: React.CSSProperties | undefined;
}

/**
 *	creates a split view of 2 synchronised maplibre instances
 */

const MlLayerSwipe = (props: MlLayerSwipeProps) => {
	const mapContext: MapContextType = useContext(MapContext);
	const initializedRef = useRef(false);
	const mapHook = useMap({
		mapId: undefined,
	});

	const [swipeX, setSwipeX] = useState(50);
	const swipeXRef = useRef(0);

	const syncCleanupFunctionRef = useRef(() => {});
	const symbolSize = 100;
	const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
	// const lineHeight = canvasHeight && (canvasHeight - symbolSize) / 2;

	window.onresize = () => {
		setCanvasHeight(mapContext.maps[props.map1Id]?.getCanvas().getBoundingClientRect().height);
	};

	useEffect(() => {
		setCanvasHeight(mapHook.map?.getCanvas().height as number);
	}, [mapHook.map]);

	const mapExists = useCallback(() => {
		if (!props.map1Id || !props.map2Id) {
			return false;
		}
		if (!mapContext.getMap(props.map1Id) || !mapContext.getMap(props.map2Id)) {
			return false;
		}

		return true;
	}, [mapContext, props.map1Id, props.map2Id]);

	const cleanup = () => {
		syncCleanupFunctionRef.current();
	};

	const onMove = useCallback(
		(e: TouchEvent & MouseEvent) => {
			if (!mapExists()) return;

			const bounds = mapContext.maps[props.map1Id].getCanvas().getBoundingClientRect();
			let clientX =
				e.clientX ||
				(typeof e.touches !== 'undefined' && typeof e.touches[0] !== 'undefined'
					? e.touches[0].clientX
					: 0);

			clientX -= bounds.x;
			const swipeX_tmp = parseFloat(((clientX / bounds.width) * 100).toFixed(2));

			if (swipeXRef.current !== swipeX_tmp) {
				setSwipeX(swipeX_tmp);
				swipeXRef.current = swipeX_tmp;

				const clipA = 'rect(0, ' + (swipeXRef.current * bounds.width) / 100 + 'px, 999em, 0)';

				mapContext.maps[props.map2Id].getContainer().style.clip = clipA;
			}
		},
		[mapContext, mapExists, props.map1Id, props.map2Id]
	);

	useEffect(() => {
		return cleanup;
	}, []);

	useEffect(() => {
		if (!mapExists() || initializedRef.current) return;

		initializedRef.current = true;
		syncCleanupFunctionRef.current = syncMove(
			mapContext.getMap(props.map1Id).map,
			mapContext.getMap(props.map2Id).map
		);
		onMove({
			clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
		} as TouchEvent & MouseEvent);
	}, [mapContext.mapIds, mapContext, props, onMove, mapExists]);

	const onDown = (e: React.MouseEvent | React.TouchEvent) => {
		if (e.nativeEvent && e.nativeEvent instanceof TouchEvent) {
			document.addEventListener('touchmove', onMove);
			document.addEventListener('touchend', onTouchEnd);
		} else {
			document.addEventListener('mousemove', onMove);
			document.addEventListener('mouseup', onMouseUp);
		}
	};

	const onTouchEnd = () => {
		document.removeEventListener('touchmove', onMove);
		document.removeEventListener('touchend', onTouchEnd);
	};

	const onMouseUp = () => {
		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('mouseup', onMouseUp);
	};

	function adjustWindowSize() {
		const clipWidth = mapContext.maps[props.map2Id]
			.getContainer()
			.style.clip.split(',')[1]
			.replace('px', '');
		const canvasWidth = mapContext.maps[props.map1Id].getCanvas().getBoundingClientRect().width;

		if (parseFloat(clipWidth) < canvasWidth) {
			const newPosition = parseFloat(((clipWidth / canvasWidth) * 100).toFixed(2));
			setSwipeX(newPosition);
		} else {
			const newClip = 'rect(0, ' + canvasWidth / 2 + 'px, 999em, 0)';
			mapContext.maps[props.map2Id].getContainer().style.clip = newClip;
			setSwipeX(50);
		}
	}

	useEffect(() => {
		window.addEventListener('resize', adjustWindowSize);

		return () => {
			window.removeEventListener('resize', adjustWindowSize);
		};
	}, [mapContext]);

	return (
		<>
			<div
				style={{
					position: 'absolute',
					left: swipeX + '%',
					top: '50%',
					borderRadius: '50%',
					width: '100px',
					height: symbolSize + 'px',
					cursor: 'pointer',
					zIndex: '110',
					marginLeft: '-50px',
					marginTop: '-50px',
					textAlign: 'center',
					lineHeight: '91px',
					fontSize: '2em',
					color: '#009EE0',
					opacity: '50%',
					userSelect: 'none',
					...props.buttonStyle,
				}}
				onTouchStart={onDown}
				onMouseDown={onDown}
			>
				<CircleIcon />
			</div>
			<div
				style={{
					position: 'absolute',
					left: swipeX + '%',
					width: '4px',
					marginLeft: '-2px',
					height: canvasHeight + 'px',
					zIndex: '1200',
					fontSize: '2em',
					background: '#009ee0',
					opacity: '50%',
					userSelect: 'none',
				}}
			></div>
		</>
	);
};

MlLayerSwipe.defaultProps = {
	buttonStyle: {},
};

export default MlLayerSwipe;
