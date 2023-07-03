import React, { useMemo, useState } from 'react';
import { Box } from '@mui/system';
import { ListItemIcon, ListItemText, List, Checkbox, ListItem, IconButton } from '@mui/material';
import { KeyboardArrowRight as ExpandLess, ExpandMore } from '@mui/icons-material';

const listItemStyle = {
	paddingRight: 0,
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: '4px',
};
const listItemIconStyle = {
	minWidth: '30px',
};

const iconButtonStyle = {
	marginRight: '0px',
	padding: '0px',
};
const checkboxStyle = {
	padding: 0,
	marginRight: '5px',
};
const boxStyle = (open: boolean) => ({
	display: open ? 'block' : 'none',
});
const listStyle = {
	marginLeft: '25px',
};

interface LayerListFolderProps {
	visible: boolean;
	name?: string;
	children: JSX.Element | JSX.Element[];
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
			<ListItem sx={listItemStyle}>
				<ListItemIcon sx={listItemIconStyle}>
					<IconButton
						sx={iconButtonStyle}
						edge="end"
						aria-label="open"
						onClick={() => setOpen(!open)}
					>
						{open ? <ExpandMore /> : <ExpandLess />}
					</IconButton>
					<Checkbox
						disabled={setVisible ? false : !visible}
						checked={setVisible ? visible : localVisible}
						sx={checkboxStyle}
						onClick={() => {
							if (setVisible) {
								setVisible((val) => !val);
							} else {
								setLocalVisible((val) => !val);
							}
						}}
					/>
				</ListItemIcon>
				<ListItemText primary={name} variant="layerlist" />
			</ListItem>
			<Box sx={boxStyle(open)}>
				<List component="div" disablePadding sx={listStyle}>
					{_children}
				</List>
			</Box>
		</>
	);
}
export default LayerListFolder;
