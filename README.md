# Avantgarde

This is a design + [Next.js](https://nextjs.org/) + [Strapi CMS](https://strapi.io/) + [Stripe](https://stripe.com/) for payment processing practice project.
All images rights belong to Google’s Arts and Culture and their respective owners.

![Mobile home](/images/home_mobile.png)
![Desktop home](/images/home_desktop.png)
![Mobile catalogue](/images/catalogue_mobile.png)
![Desktop catalogue](/images/catalogue_desktop.png)
![Mobile product](/images/product_mobile.png)
![Desktop product](/images/product_desktop.png)

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

Sixth, set up the frontend by generating a Strapi API token `STRAPI_API_KEY` from the dashboard at [http://localhost:1337/admin](http://localhost:1337/admin)

Seventh, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Eighth, generate API Keys from Stripe by going to the [Stripe Dashboard](https://dashboard.stripe.com/), navigate to the API keys section and copy the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`. Add the keys to the `.env` file in the root folder.