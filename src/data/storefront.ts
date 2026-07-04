import { siteImages } from './siteImages';

export const heroFeature = {
  eyebrow: 'New season edit',
  title: 'Clothes that work beyond the first wear.',
  lead:
    'A tighter selection of daily layers, occasion pieces, and accessories chosen for fit, fabric, and repeat styling.',
  primaryCta: 'Shop new edits',
  secondaryCta: 'Find your fit',
  image: siteImages.hero,
  imageAlt: 'Model wearing a tailored neutral outfit for the TrendWear seasonal edit',
  noteTitle: 'Stylist note',
  noteBody: 'Start with one strong layer, then build the rest of the outfit around texture.',
} as const;

export const collections = [
  {
    title: 'Dinner plans',
    subtitle: 'Slip dresses, soft tailoring, and small accessories',
    image: siteImages.evening,
    to: '/shop?category=dresses',
  },
  {
    title: 'Work to weekend',
    subtitle: 'Blazers, denim, and easy layering pieces',
    image: siteImages.street,
    to: '/shop?category=women',
  },
  {
    title: 'Finishing touches',
    subtitle: 'Bags, hoops, and pieces that pull a look together',
    image: siteImages.accessories,
    to: '/shop?category=accessories',
  },
] as const;

export const marqueeItems = [
  'Free returns for 30 days',
  'Tracked delivery',
  'Small-batch edits',
  'Secure checkout',
] as const;

export const serviceHighlights = [
  {
    title: 'Fast dispatch',
    body: 'Most orders leave the warehouse within two business days.',
  },
  {
    title: 'Fit support',
    body: 'Size guidance and easy exchanges help reduce returns.',
  },
  {
    title: 'Edited stock',
    body: 'Focused drops keep the catalogue clear and easier to shop.',
  },
] as const;

export const stylingNotes = [
  'Build a capsule around neutral layers, then use color through one statement item.',
  'Choose breathable fabrics for pieces you expect to wear weekly.',
  'Keep one polished shoe and one everyday sneaker in rotation for more outfit range.',
] as const;

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'Women', to: '/shop?category=women' },
      { label: 'Men', to: '/shop?category=men' },
      { label: 'Dresses', to: '/shop?category=dresses' },
      { label: 'Shoes', to: '/shop?category=shoes' },
    ],
  },
  {
    title: 'Brand',
    links: [
      { label: 'About TrendWear', to: '/info/about' },
      { label: 'Sustainability', to: '/info/sustainability' },
      { label: 'Careers', to: '/info/careers' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping', to: '/info/shipping' },
      { label: 'Returns', to: '/info/returns' },
      { label: 'Size Guide', to: '/info/size-guide' },
    ],
  },
] as const;
