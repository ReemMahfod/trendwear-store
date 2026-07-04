import { Link } from 'react-router-dom';
import { collections } from '../../data/storefront';
import { CATEGORIES } from '../../types';

export function CollectionsShowcase() {
  return (
    <section className="collections">
      <div className="collections__head">
        <p className="eyebrow">Shop with a plan</p>
        <h2>Start from the way you dress</h2>
      </div>
      <div className="collections__grid">
        {collections.map((item) => (
          <Link key={item.title} to={item.to} className="collection-card">
            <img src={item.image} alt="" loading="lazy" />
            <div className="collection-card__overlay">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span>Explore edit</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="collections__chips">
        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
          <Link key={cat.id} to={`/shop?category=${cat.id}`} className="chip-link">
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
