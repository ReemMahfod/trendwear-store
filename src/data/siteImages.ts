const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const siteImages = {
  hero: unsplash('photo-1483985988355-763728e1935b', 800),
  evening: unsplash('photo-1595777458108-fde6c4e5e5c3', 900),
  street: unsplash('photo-1544022613-e87ca75a784a', 900),
  accessories: unsplash('photo-1590871191283-56a332af515c', 900),
  shopBanner: unsplash('photo-1445205170230-053b83016050', 1400),
  authArt: unsplash('photo-1490481651871-ab68de25d43d', 900),
} as const;
