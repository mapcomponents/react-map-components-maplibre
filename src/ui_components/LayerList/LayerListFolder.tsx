import { KeyboardArrowRight as ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemIcon, ListItemText, List, Checkbox, ListItem, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo, useState } from 'react';

type Props = {
	visible: boolean;
	name?: string;
	children: JSX.Element | JSX.Element[];
	setVisible?: (visible: boolean | ((val: unknown) => boolean)) => void;
};

export default function LayerListFolder({ visible = true, name, children, setVisible }: Props) {
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
			<ListItem
				className={'listItemFolder'}
				sx={{
					paddingRight: 0,
					paddingLeft: 0,
					paddingTop: 0,
					paddingBottom: '4px',
				}}
			>
				<ListItemIcon sx={{ minWidth: '30px' }}>
					<IconButton edge="end" aria-label="open" onClick={() => setOpen(!open)}>
						{open ? <ExpandMore /> : <ExpandLess />}
					</IconButton>
					<Checkbox
						disabled={setVisible ? false : !visible}
						checked={setVisible ? visible : localVisible}
						sx={{ padding: 0 }}
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
			<Box sx={{ display: open ? 'block' : 'none' }}>
				<List component="div" disablePadding sx={{ marginLeft: '25px' }}>
					{_children}
				</List>
			</Box>
		</>
	);
}
