import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Card } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const shipping = subtotal >= 49 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handlePlaceOrder() {
    clearCart();
    navigate('/account');
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {!isAuthenticated && (
        <Alert variant="info">
          <Link to="/login" state={{ from: '/checkout' }}>Sign in</Link> for faster checkout
          and order tracking.
        </Alert>
      )}

      <div className="checkout-layout">
        <Card title="Shipping Address">
          <div className="checkout-fields">
            <input className="field__input" placeholder="Full name" aria-label="Full name" />
            <input className="field__input" placeholder="Address" aria-label="Address" />
            <input className="field__input" placeholder="City" aria-label="City" />
            <input className="field__input" placeholder="ZIP code" aria-label="ZIP code" />
          </div>
        </Card>

        <Card title="Payment">
          <div className="checkout-fields">
            <input className="field__input" placeholder="Card number" aria-label="Card number" autoComplete="cc-number" />
            <div className="checkout-row">
              <input className="field__input" placeholder="MM/YY" aria-label="Expiry" autoComplete="cc-exp" />
              <input className="field__input" placeholder="CVC" aria-label="CVC" autoComplete="cc-csc" />
            </div>
          </div>
        </Card>

        <aside className="cart-summary">
          <h2>Order Total</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="cart-summary__total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <Button fullWidth size="lg" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </aside>
      </div>
    </div>
  );
}
