import React from 'react';

interface CompassNeedleProps {
	className?: string;
	title?: string;
	onClick?: () => void;
	style?: React.CSSProperties;
}

const CompassNeedle: React.FC<CompassNeedleProps> = ({ className = '', title, onClick, style }) => {
	return (
		<svg
			width="10"
			height="40"
			viewBox="0 0 10 40"
			fill="none"
			className={className}
			onClick={onClick}
			role={title ? 'img' : 'presentation'}
			aria-hidden={!title}
			style={style}
		>
			{title && <title>{title}</title>}
			<g transform="translate(0.67544,-1.25e-5)">
				<path
					d="m 3.34715,4.52028 c 0.22737,-1.05154 1.72745,-1.05154 1.95482,0 L 8.64912,20 H 0 Z"
					fill="#cf003d"
				/>
				<path
					d="m 3.34715,35.4797 c 0.22737,1.0516 1.72745,1.0516 1.95482,0 L 8.64912,20 H 0 Z"
					fill="#d3dcf0"
				/>
			</g>
		</svg>
	);
};

export default CompassNeedle;
