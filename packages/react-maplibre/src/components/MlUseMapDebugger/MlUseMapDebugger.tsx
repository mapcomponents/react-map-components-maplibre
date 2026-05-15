import { FC, useRef } from 'react';

import useMapState from '../../hooks/useMapState';

export interface MlUseMapDebuggerProps {
	mapId?: string;
	watch?: string[];
	filter?: { [key: string]: any };
}

//Add default props to MlUseMapDebugger
type MlUseMapDebuggerComponent = FC<MlUseMapDebuggerProps>;

/**
 * Renders a collapsible top-drawer containing live map debug information
 *
 * @param {MlUseMapDebuggerProps} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlUseMapDebugger: MlUseMapDebuggerComponent = (props: MlUseMapDebuggerProps) => {
	const map = useMapState({
		mapId: props.mapId,
		watch: {
			layers: true,
			sources: false, // not yet provided
			viewport: false,
			...props.watch,
		},
		filter: {
			...props.filter,
		},
	});
	const renderCounter = useRef(0);
	renderCounter.current = renderCounter.current + 1;

	return (
		<>
			<div style={{ overflow: 'hidden', width: '100px', height: '20px' }}>
				Render: {renderCounter.current}
				<br />
				<pre>{JSON.stringify(map, null, ' ')}</pre>
			</div>
		</>
	);
};

export default MlUseMapDebugger;
