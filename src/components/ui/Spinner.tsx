interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClass = { sm: 'spinner--sm', md: 'spinner--md', lg: 'spinner--lg' };

export function Spinner({ size = 'md', label = 'Loading...' }: SpinnerProps) {
  return (
    <div className={`spinner ${sizeClass[size]}`} role="status" aria-label={label}>
      <span className="spinner__ring" />
    </div>
  );
}
