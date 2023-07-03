import React from 'react';
import { List } from '@mui/material';

const listStyle = { marginTop: '15px' };

interface LayerListProps {
	mapId?: string;
	children?: JSX.Element | JSX.Element[];
}

function LayerList(props: LayerListProps) {
	return <List sx={listStyle}>{props?.children}</List>;
}

export default LayerList;
