# MUSTAV — Artisan Smashed Burgers 🍔

the website for mustav, a smashed burger spot in pakistan. built with next.js, tailwind, and a whole lot of cravings.

## what's this

a clean, fast food ordering site where you can:
- browse the menu and check out each burger's stats (calories, protein, spice level)
- add items to cart and adjust quantities
- checkout with easy paisa, jazz cash, or card
- find locations across lahore, islamabad, rawalpindi, and multan

## tech stack

- **next.js 16** — app router, server components, the works
- **react 19** — hooks, context, the whole deal
- **tailwind css v4** — utility-first styling
- **typescript** — because types save friendships

## getting started

```bash
# clone it
git clone git@github.com:KhizarDoingProgramming/MUSTAV.git

# install deps
npm install

# run dev server
npm run dev
```

then open [http://localhost:3000](http://localhost:3000) and you're good.

## project structure

```
src/
  app/
    page.tsx          — homepage (hero, about, locations, ingredients)
    menu/page.tsx     — burger menu with add to cart
    checkout/page.tsx — checkout with payment options
    contact/page.tsx  — contact form + location cards
    spices/page.tsx   — our spices & ingredients
  components/
    nav.tsx           — navbar with cart + burger menu
    cart-ctx.tsx      — cart state management (react context)
    CartDrawer.tsx    — slide-in cart sidebar
    Footer.tsx        — site footer
    loader.tsx        — loading animation
```

## made by

khizar — smashing burgers and code since 2024
