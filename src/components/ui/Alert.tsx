type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: AlertVariant;
}

const variantClass: Record<AlertVariant, string> = {
  info: 'alert--info',
  success: 'alert--success',
  warning: 'alert--warning',
  error: 'alert--error',
};

export function Alert({ title, children, variant = 'info' }: AlertProps) {
  return (
    <div className={`alert ${variantClass[variant]}`} role="alert">
      {title && <strong className="alert__title">{title}</strong>}
      <div className="alert__body">{children}</div>
    </div>
  );
}
