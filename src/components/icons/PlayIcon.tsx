interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

function PlayIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={className}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default PlayIcon;

