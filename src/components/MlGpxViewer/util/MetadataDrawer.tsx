import React from 'react'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MetadataType } from '../../../hooks/useGpx/useGpx';

type Props = {
  metadata: MetadataType[];
  open: boolean;
}

export default function MetadataDrawer(props: Props) {
  return (
			<Drawer variant="persistent" anchor="left" open={props.open}>
				<Typography
					variant="h6"
					style={{
						textAlign: 'center',
						padding: '1em',
					}}
					noWrap
				>
					Informationen zur Route
				</Typography>
				<Divider />
				<List>
					{props.metadata?.length && props.metadata.map((item, idx) => (
						<ListItem key={`item--${idx}`}>
							<ListItemText primary={item.value} />
						</ListItem>
					))}
				</List>
			</Drawer>
  )
}