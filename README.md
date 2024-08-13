# Avantgarde

This is a design + [Next.js](https://nextjs.org/) + Strapi CMS + Stripe for payment processing practice project.

## Getting Started

First, install dependencies:

```bash
npm install
```

Second, run the development server:
```bash
npm run dev
```

Third, install dependencies in the /backend folder:
```bash
npm install
```

Fourth, start Strapi CMS:
```bash
npm run build
npm run develop
```

Fifth, seed the data:

```bash
npm run strapi import export_20240805235503.tar.gz.enc 
```

Sixth, set up the frontend by generating a Strapi API token "`STRAPI_API_KEY`" from the dashboard at [http://localhost:1337/admin](http://localhost:1337/admin)

Seventh, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
