import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../types';

interface CategoryNavProps {
  active?: string;
  onSelect?: (id: string) => void;
  linkMode?: boolean;
}

export function CategoryNav({ active = 'all', onSelect, linkMode = false }: CategoryNavProps) {
  return (
    <nav className="category-nav" aria-label="Categories">
      {CATEGORIES.map((cat) =>
        linkMode ? (
          <Link
            key={cat.id}
            to={cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`}
            className={`category-pill ${active === cat.id ? 'category-pill--active' : ''}`}
          >
            {cat.label}
          </Link>
        ) : (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${active === cat.id ? 'category-pill--active' : ''}`}
            onClick={() => onSelect?.(cat.id)}
          >
            {cat.label}
          </button>
        ),
      )}
    </nav>
  );
}
