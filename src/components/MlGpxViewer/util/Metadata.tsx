import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MetadataType } from '../../../hooks/useGpx/useGpx';

type Props = {
	metadata: MetadataType[];
};

export default function Metadata(props: Props) {
	return (
		<List>
			{props.metadata?.length > 0 &&
				props.metadata.map((item, idx) => (
					<ListItem key={`item--${idx}`}>
						<ListItemText primary={item.value} />
					</ListItem>
				))}
		</List>
	);
}
