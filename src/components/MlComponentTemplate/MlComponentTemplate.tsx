import React from "react";
import useMap from "../../hooks/useMap";

export interface MlComponentTemplateProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
}

/**
 * Component description
 *
 */
const MlComponentTemplate = (props: MlComponentTemplateProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
	});
	console.log(mapHook.componentId + " remove this log");

	return <></>;
};

MlComponentTemplate.defaultProps = {
	mapId: undefined,
};
export default MlComponentTemplate;
