import { Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { Button } from '../components/ui';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { items, subtotal, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  const shipping = subtotal >= 49 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your bag is empty</h1>
        <p>Discover the latest trends and fill your bag.</p>
        <Link to="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Bag ({itemCount})</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;

            return (
              <article key={item.cartKey} className="cart-item">
                <Link to={`/product/${product.slug}`} className="cart-item__image">
                  <img src={product.images[0]} alt={product.name} loading="lazy" width={120} height={150} />
                </Link>
                <div className="cart-item__info">
                  <Link to={`/product/${product.slug}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{item.color} · Size {item.size}</p>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
                <div className="cart-item__actions">
                  <div className="qty-control">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeItem(item.cartKey)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          {subtotal < 49 && subtotal > 0 && (
            <p className="cart-summary__hint">
              Add {formatPrice(49 - subtotal)} more for free shipping
            </p>
          )}
          <div className="cart-summary__total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <Link to="/checkout">
            <Button fullWidth size="lg">
              Checkout
            </Button>
          </Link>
          <Button variant="ghost" fullWidth onClick={clearCart}>
            Clear Bag
          </Button>
        </aside>
      </div>
    </div>
  );
}
