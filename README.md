# MUSTAV — Artisan Smashed Burgers

A modern food ordering website for **MUSTAV**, a premium smashed burger restaurant chain based in Pakistan. Built with Next.js, featuring a full menu with detailed nutritional info, shopping cart, multi-step checkout with local payment methods, and a slick UI with smooth animations.

### Live Demo

> **[mustav.shop](https://mustav.shop)** — check it out live on Vercel

---

## What It Does

MUSTAV is a complete food ordering platform where customers can:

- **Browse the menu** — 6 signature smashed burgers with details on calories, protein, spice level, bun type, and patty
- **Add to cart** — slide-in cart drawer with quantity controls, running total, and checkout link
- **Checkout** — full checkout flow with delivery details form and multiple payment options (EasyPaisa, JazzCash, Credit/Debit Card)
- **Find locations** — interactive location cards for Lahore, Islamabad, Rawalpindi, and Multan
- **Explore ingredients** — dedicated page showcasing fresh ingredients and spices
- **Get in touch** — contact form with location information

## Features

- Responsive design — works on desktop, tablet, and mobile
- Animated loading screen with burger build sequence
- Custom cursor follower
- Scroll-triggered reveal animations
- Sticky navbar with cart badge and hamburger menu
- Slide-in cart drawer with real-time updates
- Toast notifications on add-to-cart
- Marquee/ticker text animations
- Grain texture overlay for that premium feel

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | Framework — App Router, Server Components |
| React | 19 | UI library — Hooks, Context API |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling — Utility-first CSS |
| Google Fonts | — | Modak (headings) + Mouse Memoirs (body) |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repo
git clone git@github.com:KhizarDoingProgramming/MUSTAV.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage — hero, about, locations, ingredients
│   ├── menu/page.tsx         # Burger menu with add-to-cart functionality
│   ├── checkout/page.tsx     # Checkout with payment methods
│   ├── contact/page.tsx      # Contact form + location cards
│   ├── spices/page.tsx       # Ingredients & spices showcase
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles, CSS variables, animations
│   ├── favicon.ico           # Browser tab icon
│   ├── icon.png              # PWA icon (512x512)
│   └── apple-touch-icon.png  # iOS home screen icon (180x180)
│
├── components/
│   ├── nav.tsx               # Navbar — logo, cart button, burger menu toggle
│   ├── cart-ctx.tsx          # Cart state management (React Context)
│   ├── CartDrawer.tsx        # Slide-in cart sidebar with item controls
│   ├── ClientProviders.tsx   # Root client provider (CartProvider + CartDrawer)
│   ├── Footer.tsx            # Site footer with links and CTA
│   ├── loader.tsx            # Animated burger-building loading screen
│   ├── Reveal.tsx            # Scroll-triggered reveal animation wrapper
│   ├── Ticker.tsx            # Horizontal marquee/ticker component
│   ├── cursor.tsx            # Custom cursor follower
│   └── scrollbar.tsx         # Scroll progress indicator bar
│
└── lib/
    └── useAnimations.ts      # Shared animation utilities
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, about section, city locations, and ingredients |
| `/menu` | Full burger menu — 6 items with nutritional info and add-to-cart |
| `/checkout` | Order summary, delivery details, payment selection |
| `/contact` | Contact form and location cards |
| `/spices` | Fresh ingredients and spice profiles |

## Cart System

The cart uses React Context (`cart-ctx.tsx`) for global state management. It supports:

- Adding items (auto-increments if already in cart)
- Quantity adjustment (+ / -)
- Real-time total calculation
- Slide-in drawer UI (`CartDrawer.tsx`)
- Persistent across page navigation

## Payment Methods

- **EasyPaisa** — mobile wallet
- **JazzCash** — mobile wallet
- **Credit / Debit Card** — card payment

## Deployment

This project is deployed on **Vercel**. To deploy your own:

```bash
# Build the project
npm run build

# Or push to GitHub and connect to Vercel
git push origin main
```

## Made By

**MUSTAFA** — smashing burgers and code since 2024

---

Feel free to open issues or submit PRs if you want to contribute.
