import { List } from '@mui/material';
import React from 'react';

type Props = {
	children: JSX.Element | JSX.Element[];
};

function LayerList({ children }: Props) {
	return <List sx={{marginTop:'15px'}}>{children}</List>;
}

export default LayerList;
