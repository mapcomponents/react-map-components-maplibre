import React, { ReactNode, useMemo, useState } from 'react';
import { Box, styled } from '@mui/system';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ListItemStyled = styled(ListItem)({
	paddingRight: 0,
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: '4px',
});
const ListItemIconStyled = styled(ListItemIcon)({
	minWidth: '30px',
});
const IconButtonStyled = styled(IconButton)({
	marginRight: '0px',
	padding: '0px',
});
const CheckboxStyled = styled(Checkbox)({
	padding: 0,
	marginRight: '5px',
});
const BoxStyled = styled(Box)<{ open: boolean }>(({ open }) => ({
	display: open ? 'block' : 'none',
}));
const ListStyled = styled(List)({
	marginLeft: '50px',
});

interface LayerListFolderProps {
	visible: boolean;
	name?: string | ReactNode;
	children: React.JSX.Element | React.JSX.Element[];
	setVisible?: (visible: boolean | ((val: unknown) => boolean)) => void;
}

function LayerListFolder({ visible = true, name, children, setVisible }: LayerListFolderProps) {
	const [open, setOpen] = useState(false);
	const [localVisible, setLocalVisible] = useState(true);
	const _visible = useMemo(() => {
		if (!visible) {
			return false;
		}
		return localVisible;
	}, [visible, localVisible]);

	const _children = useMemo(() => {
		if (children) {
			if (Array.isArray(children)) {
				return children.map((element) => {
					return React.cloneElement(element, {
						visible: _visible,
					});
				});
			}
			return React.cloneElement(children, {
				visible: _visible,
			});
		}
		return <></>;
	}, [_visible]);

	return (
		<>
			<ListItemStyled>
				<ListItemIconStyled>
					<IconButtonStyled edge="end" aria-label="open" onClick={() => setOpen(!open)}>
						{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
					</IconButtonStyled>
					<CheckboxStyled
						disabled={setVisible ? false : !visible}
						checked={setVisible ? visible : localVisible}
						onClick={() => {
							if (setVisible) {
								setVisible((val) => !val);
							} else {
								setLocalVisible((val) => !val);
							}
						}}
					/>
				</ListItemIconStyled>
				<ListItemText primary={name} variant="layerlist" />
			</ListItemStyled>
			<BoxStyled open={open}>
				<ListStyled disablePadding>{_children}</ListStyled>
			</BoxStyled>
		</>
	);
}

export default LayerListFolder;
