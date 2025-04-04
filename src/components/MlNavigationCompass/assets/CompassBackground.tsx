import React from 'react';

interface CompassBackgroundProps {
  className?: string;
  title?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CompassBackground: React.FC<CompassBackgroundProps> = ({ 
  className = '', 
  title,
  onClick,
  style
}) => {
  return (
    <svg 
      width="52" 
      height="53" 
      viewBox="0 0 52 53" 
      fill="none" 
      className={className}
      onClick={onClick}
      role={title ? 'img' : 'presentation'}
      aria-hidden={!title}
      style={style}
    >
      {title && <title>{title}</title>}
      <circle cx="26.0001" cy="26.1843" r="24" fill="white" stroke="#009EE0" strokeWidth="2"/>
      <path d="M26.4915 7.59161C26.3524 8.07338 25.6698 8.07338 25.5307 7.59161L24.2998 3.3276C24.2075 3.0079 24.4474 2.68893 24.7802 2.68893H27.242C27.5748 2.68893 27.8147 3.0079 27.7224 3.3276L26.4915 7.59161Z" fill="#009EE0"/>
      <path d="M25.5085 44.7598C25.6476 44.278 26.3302 44.278 26.4693 44.7598L27.7002 49.0238C27.7925 49.3435 27.5526 49.6625 27.2198 49.6625H24.758C24.4252 49.6625 24.1853 49.3435 24.2776 49.0238L25.5085 44.7598Z" fill="#009EE0"/>
      <path d="M44.6641 26.4915C44.1823 26.3524 44.1823 25.6698 44.6641 25.5307L48.9281 24.2998C49.2478 24.2075 49.5668 24.4474 49.5668 24.7802V27.242C49.5668 27.5747 49.2478 27.8147 48.9281 27.7224L44.6641 26.4915Z" fill="#009EE0"/>
      <path d="M7.3959 25.6085C7.87766 25.7476 7.87766 26.4302 7.3959 26.5693L3.13189 27.8002C2.81218 27.8925 2.49321 27.6526 2.49321 27.3198L2.49321 24.858C2.49321 24.5253 2.81218 24.2853 3.13189 24.3776L7.3959 25.6085Z" fill="#009EE0"/>
    </svg>
  );
};

export default CompassBackground;