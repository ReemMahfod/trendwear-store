import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { siteImages } from '../data/siteImages';
import { ProductGrid } from '../components/product/ProductGrid';
import { CATEGORIES, type SortOption } from '../types';
import { filterCatalog, getCategoryLabel } from '../utils/catalog';

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const query = params.get('q')?.toLowerCase() ?? '';
  const sort = (params.get('sort') as SortOption) ?? 'featured';

  const filtered = useMemo(
    () => filterCatalog(products, { category, query, sort }),
    [category, query, sort],
  );

  const title = query
    ? `Results for "${params.get('q')}"`
    : category === 'all'
      ? 'The Shop'
      : getCategoryLabel(category);
  const hasActiveFilters = category !== 'all' || query;

  function setCategory(id: string) {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    setParams(next);
  }

  return (
    <div className="shop-page">
      <div className="shop-banner">
        <img src={siteImages.shopBanner} alt="" />
        <div>
          <p className="eyebrow">TrendWear catalogue</p>
          <h1>{title}</h1>
          <p>{filtered.length} pieces available now</p>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <h2>Filter</h2>
          <nav className="shop-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={category === cat.id ? 'active' : ''}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>
          <Link to="/" className="shop-sidebar__link">
            ← Back home
          </Link>
        </aside>

        <div className="shop-content">
          <div className="shop-toolbar">
            <div>
              <p className="shop-toolbar__meta">
                {hasActiveFilters ? 'Filtered selection' : 'Full selection'}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="shop-toolbar__reset"
                  onClick={() => setParams(new URLSearchParams())}
                >
                  Clear filters
                </button>
              )}
            </div>
            <select
              className="sort-select"
              value={sort}
              aria-label="Sort products"
              onChange={(e) => {
                const next = new URLSearchParams(params);
                next.set('sort', e.target.value);
                setParams(next);
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <ProductGrid
            products={filtered}
            emptyMessage="No pieces match that search yet. Try a broader category or a simpler keyword."
          />
        </div>
      </div>
    </div>
  );
}
