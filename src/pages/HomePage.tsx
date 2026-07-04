import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { heroFeature, marqueeItems, serviceHighlights, stylingNotes } from '../data/storefront';
import { CollectionsShowcase } from '../components/home/CollectionsShowcase';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui';

export function HomePage() {
  const curated = useMemo(() => products.filter((p) => p.isTrending).slice(0, 4), []);
  const newArrivals = useMemo(() => products.filter((p) => p.isNew).slice(0, 4), []);
  const saleItems = useMemo(() => products.filter((p) => p.isSale).slice(0, 4), []);

  return (
    <div className="home">
      <section className="hero-editorial">
        <div className="hero-editorial__bg" aria-hidden="true" />
        <div className="hero-editorial__inner">
          <div className="hero-editorial__copy">
            <p className="eyebrow">{heroFeature.eyebrow}</p>
            <h1>{heroFeature.title}</h1>
            <p className="hero-editorial__lead">{heroFeature.lead}</p>
            <div className="hero-editorial__actions">
              <Link to="/shop">
                <Button size="lg">{heroFeature.primaryCta}</Button>
              </Link>
              <Link to="/info/size-guide">
                <Button size="lg" variant="secondary">
                  {heroFeature.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-editorial__visual">
            <img
              src={heroFeature.image}
              alt={heroFeature.imageAlt}
              loading="eager"
              fetchPriority="high"
              width={560}
              height={700}
            />
            <div className="hero-editorial__card">
              <span className="hero-editorial__card-mark" aria-hidden="true">TW</span>
              <div>
                <strong>{heroFeature.noteTitle}</strong>
                <span>{heroFeature.noteBody}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CollectionsShowcase />

      <section className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <ProductGrid products={curated} title="Pieces with strong reviews" />

      <section className="styling-notes" aria-labelledby="styling-notes-title">
        <div>
          <p className="eyebrow">Styling desk</p>
          <h2 id="styling-notes-title">Simple notes before you buy</h2>
        </div>
        <div className="styling-notes__grid">
          {stylingNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>

      {newArrivals.length > 0 && <ProductGrid products={newArrivals} title="Recently added" />}
      {saleItems.length > 0 && <ProductGrid products={saleItems} title="Reduced, still useful" />}

      <section className="trust-panel">
        {serviceHighlights.map((highlight) => (
          <div key={highlight.title}>
            <strong>{highlight.title}</strong>
            <p>{highlight.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
