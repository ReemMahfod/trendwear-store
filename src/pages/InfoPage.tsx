import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/ui';

const PAGES = {
  about: {
    title: 'About TrendWear',
    description: 'Seasonal fashion edits with clear product details and easy shopping.',
    body: [
      'TrendWear keeps the catalogue intentionally clear: fewer pieces, useful product information, and edits that help customers shop by need rather than noise.',
      'Every drop is arranged around everyday outfits, occasion dressing, and practical details such as fit, fabric, care, delivery, and returns.',
    ],
  },
  sustainability: {
    title: 'Sustainability',
    description: 'How we think about materials, packaging, and longevity.',
    body: [
      'The catalogue highlights fabric information and care notes so customers can make better decisions before ordering.',
      'Orders ship in recyclable packaging where available. The product strategy favors pieces that can be worn repeatedly instead of one-event purchases.',
    ],
  },
  careers: {
    title: 'Careers',
    description: 'Join the team behind TrendWear.',
    body: [
      'We are a small team spanning buying, creative, and customer care. We hire people who care about product quality and clear communication.',
      'Open roles are posted here as they become available. For now, send your CV to careers@trendwear.com with the role you are interested in.',
    ],
  },
  shipping: {
    title: 'Shipping',
    description: 'Fast dispatch and tracked delivery.',
    body: [
      'Orders are packed within 48 hours on business days. Standard delivery typically arrives in 3–5 business days depending on your region.',
      'You will receive a tracking link by email as soon as your parcel leaves our warehouse. Express options appear at checkout when available.',
    ],
  },
  returns: {
    title: 'Returns',
    description: '30-day hassle-free returns on unworn items.',
    body: [
      'If something is not the right fit, you can return unworn items with tags attached within 30 days of delivery for a refund or exchange.',
      'Start a return from your account page or contact support@trendwear.com with your order number. Return shipping is free on your first exchange per order.',
    ],
  },
  'size-guide': {
    title: 'Size Guide',
    description: 'Find your fit across categories.',
    body: [
      'Women\'s tops and dresses: XS (32–34), S (36–38), M (40–42), L (44–46), XL (48–50) — measured in chest cm.',
      'Men\'s tops: S (88–92), M (96–100), L (104–108), XL (112–116) — measured in chest cm.',
      'Shoes are listed in EU sizes. If you are between sizes, we recommend sizing up for sneakers and staying true to size for fitted boots.',
    ],
  },
} as const;

type InfoSlug = keyof typeof PAGES;

export function InfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug && slug in PAGES ? PAGES[slug as InfoSlug] : null;

  if (!page) {
    return (
      <div className="info-page">
        <PageHeader title="Page not found" description="This information page does not exist." />
        <Link to="/" className="info-page__back">← Back home</Link>
      </div>
    );
  }

  return (
    <article className="info-page">
      <PageHeader title={page.title} description={page.description} />
      <div className="info-page__body">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link to="/shop" className="info-page__back">Continue shopping →</Link>
    </article>
  );
}
