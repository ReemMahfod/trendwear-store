import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { calcDiscount, formatPrice } from '../../utils/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const discount = calcDiscount(product.price, product.originalPrice);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} className="product-card__media-link">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={320}
            height={400}
          />
          <div className="product-card__shade" />
          <div className="product-card__badges">
            {product.isNew && <span className="badge badge--new">New</span>}
            {discount && <span className="badge badge--sale">-{discount}%</span>}
          </div>
          <div className="product-card__float">
            <h3>{product.name}</h3>
            <div className="product-card__price">
              <strong>{formatPrice(product.price)}</strong>
              {product.originalPrice && (
                <span className="product-card__original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </Link>
        <button
          type="button"
          className="product-card__wish"
          aria-label={`Save ${product.name}`}
        >
          +
        </button>
      </div>
      <Link to={`/product/${product.slug}`} className="product-card__meta">
        <span>★ {product.rating}</span>
        <span>{product.reviewCount.toLocaleString()} reviews</span>
      </Link>
    </article>
  );
});
