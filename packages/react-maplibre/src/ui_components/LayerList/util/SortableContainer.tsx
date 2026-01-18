import { ReactNode, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuid } from 'uuid';

interface SortableContainerProps {
	children: ReactNode;
}

function SortableContainer({ children }: SortableContainerProps) {
	const idRef = useRef(uuid());
	const { attributes, listeners, setNodeRef, transform } = useSortable({id: idRef.current});
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
