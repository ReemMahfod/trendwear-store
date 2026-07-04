import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui';
import { useCart } from '../hooks/useCart';
import { calcDiscount, formatPrice } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  if (!product) return <NotFoundPage />;

  const discount = calcDiscount(product.price, product.originalPrice);
  const related = getRelatedProducts(product);

  function handleAddToBag() {
    if (!product) return;
    if (!size) {
      setError('Please select a size');
      return;
    }
    if (!color) {
      setError('Please select a color');
      return;
    }
    setError('');
    addItem(product.id, size, color);
    navigate('/cart');
  }

  return (
    <div className="product-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              loading="eager"
              width={600}
              height={750}
            />
            {discount && <span className="badge badge--sale">-{discount}%</span>}
          </div>
          <div className="product-gallery__thumbs">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={i === selectedImage ? 'active' : ''}
                onClick={() => setSelectedImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" loading="lazy" width={80} height={100} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-info__rating">
            ★ {product.rating} · {product.reviewCount.toLocaleString()} reviews
          </div>
          <div className="product-info__price">
            <strong>{formatPrice(product.price)}</strong>
            {product.originalPrice && (
              <span className="product-info__original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="product-info__desc">{product.description}</p>

          {product.details && product.details.length > 0 && (
            <dl className="product-info__details">
              {product.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="product-options">
            <fieldset>
              <legend>Color</legend>
              <div className="color-options">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`color-swatch ${color === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Size</legend>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-btn ${size === s ? 'active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="product-actions">
            <Button size="lg" fullWidth onClick={handleAddToBag}>
              Add to Bag
            </Button>
            <Button size="lg" variant="secondary" fullWidth onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>

          <ul className="product-perks">
            <li>Free shipping on orders over $49</li>
            <li>Free returns within 30 days</li>
            <li>Secure encrypted checkout</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && <ProductGrid products={related} title="You May Also Like" />}
    </div>
  );
}
