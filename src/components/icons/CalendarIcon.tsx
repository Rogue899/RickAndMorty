interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

function CalendarIcon({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 16 16" 
      fill="none"
      className={className}
    >
      <path
        d="M5 2V4M11 2V4M3 6H13M4 4H12C12.5523 4 13 4.44772 13 5V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V5C3 4.44772 3.44772 4 4 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default CalendarIcon;

