import type { ReactNode } from 'react';
import { siteImages } from '../../data/siteImages';
import { BrandLogo } from './BrandLogo';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__visual">
        <BrandLogo light />
        <h1>Style with confidence.</h1>
        <p>Your TrendWear wardrobe starts here.</p>
        <img src={siteImages.authArt} alt="" className="auth-layout__art" />
      </div>
      <div className="auth-layout__form">
        <div className="auth-card">
          <h2>{title}</h2>
          {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
