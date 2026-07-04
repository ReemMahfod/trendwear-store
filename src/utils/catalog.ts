import { CATEGORIES, type Product, type SortOption } from '../types';

interface CatalogFilters {
  category: string;
  query: string;
  sort: SortOption;
}

export function filterCatalog(products: Product[], filters: CatalogFilters): Product[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const matches = products.filter((product) => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const searchableText = [
      product.name,
      product.description,
      product.category,
      ...(product.details?.map((detail) => detail.value) ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return sortCatalog(matches, filters.sort);
}

export function getCategoryLabel(categoryId: string): string {
  return CATEGORIES.find((category) => category.id === categoryId)?.label ?? 'All';
}

function sortCatalog(products: Product[], sort: SortOption): Product[] {
  const next = [...products];

  switch (sort) {
    case 'newest':
      return next.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price);
    default:
      return next.sort((a, b) => Number(b.isTrending) - Number(a.isTrending));
  }
}
