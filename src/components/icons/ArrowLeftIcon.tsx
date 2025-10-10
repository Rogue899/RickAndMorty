interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

function ArrowLeftIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12.5 15L7.5 10L12.5 5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowLeftIcon;

