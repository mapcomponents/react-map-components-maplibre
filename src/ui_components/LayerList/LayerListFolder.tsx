import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
	Checkbox,
	ListItem,
	IconButton,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

type Props = {
	visible: boolean;
	children: JSX.Element | JSX.Element[];
};

export default function LayerListFolder({ visible = true, children }: Props) {
	const [open, setOpen] = useState(false);
	const [localVisible, setLocalVisible] = useState(true);
	const _visible = useMemo(() => {
		if (!visible) {
			return false;
		}
		return localVisible;
	}, [visible, localVisible]);

	const _children = useMemo(() => {
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
	}, [_visible]);

	return (
		<>
			<ListItem
				secondaryAction={
					<IconButton edge="end" aria-label="open" onClick={() => setOpen(!open)}>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				}
			>
				<ListItemIcon>
					<Checkbox
						disabled={!visible}
						checked={localVisible}
						onClick={() => {
							setLocalVisible((val) => !val);
						}}
					/>
				</ListItemIcon>
				<ListItemText primary="Inbox" />
			</ListItem>
			<Collapse in={open} timeout="auto">
				<List component="div" disablePadding sx={{pl:4}}>
					{_children}
				</List>
			</Collapse>
		</>
	);
}
