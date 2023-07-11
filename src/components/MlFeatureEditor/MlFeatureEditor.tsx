import React from 'react';
import useFeatureEditor, { useFeatureEditorProps } from '../../hooks/assets/useFeatureEditor/useFeatureEditor';
import './MlFeatureEditor.css';

const MlFeatureEditor: React.FC<useFeatureEditorProps> = (props) => {
	useFeatureEditor({
		mode: props.mode,
		geojson: props.geojson,
		onChange: props.onChange,
		onFinish: props.onFinish,
		mapId: props.mapId,
	});

	return (
		<>
		</>
	);
};

export default MlFeatureEditor;