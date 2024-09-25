import React from 'react';
import { css } from '@emotion/css';
import { Box } from '@mui/system';
import ImageLoader from '../../../ui_components/ImageLoader';
import useMapState from '../../../hooks/useMapState';
import { SxProps } from '@mui/material';

interface LayerBoxProps {
	mapId?: string;
	layerId: string;
	thumbnail?: string;
	label: string;
	handleLayerBoxClick?: (layerId: string) => void;
}

const LayerBox: React.FC<LayerBoxProps> = (props) => {
	const { layers } = useMapState({
		mapId: props.mapId,
		watch: {
			viewport: false,
			layers: true,
			sources: false,
		},
		filter: {
			matchLayerIds: props.layerId,
		},
	});
	const width = '40px';

	const defaultClass = css`
		& img:hover {
		}
	`;

	const imageLoaderStyle: SxProps = {
		border: `2px solid ${layers?.[0]?.visible ? '#64c864' : '#fd720f'}`,
		borderRadius: '8px',
		height: '40px',
		width: '40px',
	};

	return (
		<>
			<Box
				key={props.layerId}
				className={defaultClass}
				sx={{
					width,
					height: '53px',
					justifyContent: 'center',
					py: 0.25,
					px: '1rem',
					cursor: 'pointer',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
				}}
				onClick={() => {
					props?.handleLayerBoxClick?.(props.layerId);
				}}
			>
				{props?.thumbnail && <ImageLoader
					sx={imageLoaderStyle}
					src={props.thumbnail}
				/>}

				<div
					className="mllayerswitcher-layer-text"
					style={{
						textAlign: 'center',
						color: 'rgb(112, 117, 122)',
						fontFamily: 'Roboto, Arial',
						width,
						fontSize: '0.60rem',
					}}
				>
					{props.label}
				</div>
			</Box>
		</>
	);
};

export default LayerBox;