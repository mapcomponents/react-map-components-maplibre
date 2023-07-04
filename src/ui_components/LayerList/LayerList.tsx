import React from 'react';
import { List, styled } from '@mui/material';

const ListStyled = styled(List)({
	marginTop: '15px',
});
interface LayerListProps {
	mapId?: string;
	children?: JSX.Element | JSX.Element[];
}

function LayerList(props: LayerListProps) {
	return <ListStyled>{props?.children}</ListStyled>;
}

export default LayerList;
