import { List } from '@mui/material';
import React from 'react';

type Props = {
	children: JSX.Element;
};

function LayerList({ children }: Props) {
	return <List>{children}</List>;
}

export default LayerList;
