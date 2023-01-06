import React, { useRef, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

type Props = {
	setData: (data: string) => void;
};

const stopDefault = (event: DragEvent) => {
	event.preventDefault();
	event.stopPropagation();
};
export default function Dropzone(props: Props) {
	const [zIndex, setZIndex] = useState(0);
	const dropZone = useRef<HTMLDivElement>(null);
	const dropHandler = (event: DragEvent) => {
		event.preventDefault();

		if (event?.dataTransfer?.items) {
			if (event.dataTransfer.items.length > 1) {
				return false;
			}
			// If dropped items aren't files, reject them
			if (event.dataTransfer.items[0].kind === 'file') {
				const reader = new FileReader();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				reader.onload = (payload: any) => {
					if (!payload?.currentTarget?.result) return;

					if (typeof props.setData === 'function') {
						props.setData(payload.currentTarget.result);
					}
				};
				const file = event.dataTransfer.items[0].getAsFile();
				if (file) {
					reader.readAsText(file);
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
		}
		return;
	};

	useEffect(() => {
		const _dropZone = dropZone.current;
		const raiseDropZoneAndStopDefault = (event: DragEvent) => {
			setZIndex(1000);
			stopDefault(event);
		};
		const lowerDropZone = () => {
			setZIndex(0);
		};
		const lowerDropZoneAndStopDefault = (event: DragEvent) => {
			setZIndex(0);
			stopDefault(event);
		};

		window.addEventListener('dragenter', raiseDropZoneAndStopDefault);
		window.addEventListener('dragover', stopDefault);

		_dropZone?.addEventListener('dragleave', lowerDropZone);

		window.addEventListener('drop', lowerDropZoneAndStopDefault);

		return () => {
			window.removeEventListener('dragenter', raiseDropZoneAndStopDefault);
			window.removeEventListener('dragover', stopDefault);
			_dropZone?.removeEventListener('dragleave', lowerDropZone);
			window.removeEventListener('drop', lowerDropZoneAndStopDefault);
		};
	}, []);

	return (
		<div
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			onDrop={dropHandler}
			ref={dropZone}
			style={{
				position: 'absolute',
				left: '0',
				top: '0',
				backgroundColor: 'rgba(255,255,255,0.5)',
				width: '100%',
				height: '100%',
				zIndex: zIndex,
			}}
		>
			<Typography
				variant="h6"
				style={{
					top: '50%',
					position: 'absolute',
					left: '50%',
					msTransform: 'translate(-50%, -50%)',
					transform: ' translate(-50%, -50%)',
				}}
				noWrap
			>
				Datei ablegen
			</Typography>
		</div>
	);
}
