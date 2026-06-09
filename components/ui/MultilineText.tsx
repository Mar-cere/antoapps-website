type MultilineTextProps = {
  text: string;
  className?: string;
};

export default function MultilineText({ text, className }: MultilineTextProps) {
  const lines = text.split('\n');
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}
