import { Link, Outlet, useNavigate } from 'react-router-dom';
import { footerLinks } from '../../data/storefront';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { CategoryNav } from '../product/CategoryNav';
import { BrandLogo } from './BrandLogo';

export function StoreLayout() {
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="store">
      <header className="store-header">
        <div className="store-header__ribbon">
          <p>Free returns for 30 days. Members get early access to limited edits. <Link to="/register">Join free</Link></p>
        </div>
        <div className="store-header__main">
          <BrandLogo />

          <div className="store-search">
            <input
              type="search"
              placeholder="Search TrendWear..."
              aria-label="Search products"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = (e.target as HTMLInputElement).value.trim();
                  navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
                }
              }}
            />
          </div>

          <div className="store-actions">
            <Link to={isAuthenticated ? '/account' : '/login'} className="store-action">
              <span className="store-action__icon" aria-hidden="true">◦</span>
              <span>{isAuthenticated ? user?.name.split(' ')[0] : 'Account'}</span>
            </Link>
            <Link to="/cart" className="store-action store-action--cart">
              <span className="store-action__icon" aria-hidden="true">◈</span>
              <span>Bag</span>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
          </div>
        </div>
        <div className="store-header__nav">
          <CategoryNav linkMode />
        </div>
      </header>

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <div className="store-footer__top">
          <BrandLogo light />
          <p>A focused fashion storefront for everyday pieces, occasion dressing, and considered accessories.</p>
        </div>
        <div className="store-footer__grid">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((link) => (
                <Link key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </div>
          ))}
          <div>
            <h4>Newsletter</h4>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="store-footer__copy">© {new Date().getFullYear()} TrendWear. All rights reserved.</p>
      </footer>
    </div>
  );
}
