import React from 'react';
import useFeatureDraw, { useFeatureDrawProps } from '../../hooks/useFeatureDraw';

const MlFeatureDraw: React.FC<useFeatureDrawProps> = (props) => {
	useFeatureDraw({
		mapId: props.mapId,
		mode: props.mode,
	});

	return <></>;
};

export default MlFeatureDraw;
