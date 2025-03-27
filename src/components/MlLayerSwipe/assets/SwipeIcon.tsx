import React from 'react';

interface SwipeIconProps {
	className?: string;
	title?: string;
	onClick?: () => void;
	style?: React.CSSProperties;
	color?: string;
}

const SwipeIcon:React.FC<SwipeIconProps> = ({ className = '', title, onClick, style, color}) => {
	return (
		<svg
			viewBox="0 0 47 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
			role={title ? 'img' : 'presentation'}
			aria-hidden={!title}
			style={style}
			color={color}
		>
			<path d="M29.5 21.25L35.75 15L29.5 8.75V21.25Z" fill="#009EE0" />
			<path d="M17.5 8.75L11.25 15L17.5 21.25V8.75Z" fill="#009EE0" />
		</svg>
	);
};

export default SwipeIcon;
