import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableContainerProps {
	children: ReactNode;
	layerId: string;
}

function SortableContainer({ children, layerId }: SortableContainerProps) {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: layerId,
	});
	const style = {
		transform: CSS.Transform.toString(transform),
	};

	return (
		<li ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</li>
	);
}

export default SortableContainer;
