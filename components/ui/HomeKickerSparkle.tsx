type HomeKickerSparkleProps = {
  className?: string;
};

export default function HomeKickerSparkle({ className = '' }: HomeKickerSparkleProps) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 0L6.65 3.85L10.5 5L6.65 6.15L5.5 10L4.35 6.15L0.5 5L4.35 3.85L5.5 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
