# TrendWear

A fashion e-commerce storefront for seasonal edits, product discovery, account access, cart management, and checkout flows.

## Features

- Product catalogue with category filtering, keyword search, sorting, and realistic product details.
- Cart state persisted in local storage with quantity controls and order summary calculations.
- Auth flow with typed context, validation, session expiry, CSRF token handling, and protected routes.
- Reusable UI primitives for buttons, cards, inputs, alerts, modals, tables, and loading states.
- Lazy-loaded routes to keep the initial bundle lean.
- Responsive storefront layout with homepage merchandising, collection cards, product detail pages, checkout, and account screens.

## Structure

```text
src/
  components/   Reusable layout, product, and UI components
  contexts/     Auth and cart providers
  data/         Catalogue, images, and storefront content
  hooks/        Context access hooks
  pages/        Route-level screens
  routes/       Protected/public route guards
  services/     Auth and API helpers
  types/        Shared TypeScript models
  utils/        Formatting, validation, security, storage, and catalogue helpers
```

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Member account

- Email: `member@trendwear.com`
- Password: `TrendWear1!`
