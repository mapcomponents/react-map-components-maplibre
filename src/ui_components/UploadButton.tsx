import React, { useRef } from 'react';
import FileCopy from '@mui/icons-material/FileCopy';
import { Button } from '@mui/material';

type Props = {
	setData: (data: string) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	buttonComponent: any;
	accept?: string
};

export default function UploadButton(props: Props) {
	const fileupload = useRef<HTMLInputElement>(null);
	const fileUploadOnChange = () => {
		if (!fileupload.current) return false;

		const file = fileupload.current?.files?.[0];
		if (!file) return false;
		const reader = new FileReader();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		reader.onload = (payload: any) => {
			if (!payload) return;

			if (typeof props.setData === 'function') {
				props.setData(payload.currentTarget?.result);
			}
		};

		reader.readAsText(file);

		return;
	};

	const upload = () => {
		if (!fileupload.current) return;

		fileupload.current.click();
	};
	return (
		<>
			{props.buttonComponent ? (
				React.cloneElement(props.buttonComponent, { onClick: upload })
			) : (
				<Button onClick={upload}>
					<FileCopy />
				</Button>
			)}
			<input
				ref={fileupload}
				onChange={fileUploadOnChange}
				type="file"
				accept={props.accept}
				id="input"
				multiple
				style={{ display: 'none' }}			
			></input>
		</>
	);
}
