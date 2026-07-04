type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
  success: 'badge--success',
  warning: 'badge--warning',
  danger: 'badge--danger',
  info: 'badge--info',
  neutral: 'badge--neutral',
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return <span className={`badge ${variantClass[variant]}`}>{children}</span>;
}
