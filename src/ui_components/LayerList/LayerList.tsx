import { List } from '@mui/material';
import React from 'react';

type Props = {
	mapId?: string;
	children?: JSX.Element | JSX.Element[];
};

function LayerList(props: Props) {

	return (
		<List sx={{ marginTop: '15px' }}>
			{props?.children}
		</List>
	);
}

export default LayerList;
