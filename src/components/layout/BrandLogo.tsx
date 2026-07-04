import { Link } from 'react-router-dom';

export function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand-logo ${light ? 'brand-logo--light' : ''}`}>
      <span className="brand-logo__mark" aria-hidden="true">
        TW
      </span>
      <span className="brand-logo__text">
        Trend<span className="brand-logo__accent">Wear</span>
      </span>
    </Link>
  );
}
