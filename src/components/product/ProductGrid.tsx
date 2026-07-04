import { memo } from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

export const ProductGrid = memo(function ProductGrid({
  products,
  title,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <section className="product-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
});
