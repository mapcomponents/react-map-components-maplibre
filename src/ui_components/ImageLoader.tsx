import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import { Box } from '@mui/system';
import { SxProps } from '@mui/material';

interface ImageLoaderProps {
	src: string;
	alt?: string;
	sx?: SxProps;
	className?: string;
}

const ImageLoader = (props: ImageLoaderProps) => {
	const [state, setState] = useState('loading');

	useEffect(() => {
		if (!props.src) {
			setState('error');
			return;
		}
		fetch(props.src)
			.then(({ ok }) => {
				if (ok) {
					setState('ready');
				} else {
					setState('error');
				}
			})
			.catch((e) => {
				console.error(e);
				setState('error');
			});
	}, [props.src]);

	const boxStyle = {
		border: 2,
		borderRadius: '8px',
		display: 'flex',
	};

	const LoadingImage = () => {
		return (
			<Box className={props.className} sx={{ ...boxStyle, ...props.sx }}>
				<CircularProgress />
			</Box>
		);
	};

	const ReadyImage = () => {
		return (
			<Box
				component={'img'}
				className={props.className}
				sx={{ ...boxStyle, ...props.sx }}
				src={props.src}
				alt={props.alt || ''}
			/>
		);
	};
	const ErrorImage = () => {
		return (
			<Box className={props.className} sx={{ ...boxStyle, ...props.sx }}>
				<ErrorIcon sx={{ display: 'block', margin: 'auto' }} />
			</Box>
		);
	};

	const renderImage = (state: string) => {
		switch (state) {
			case 'ready':
				return <ReadyImage />;
			case 'error':
				return <ErrorImage />;
			default:
				return <LoadingImage />;
		}
	};

	return <>{renderImage(state)}</>;
};

export default ImageLoader;
