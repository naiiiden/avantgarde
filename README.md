# Avantgarde

This is a design + [Next.js](https://nextjs.org/) + [Strapi CMS](https://strapi.io/) + [Stripe](https://stripe.com/) for payment processing practice project.
All image rights belong to Google’s Arts and Culture and their respective owners.

![Gif](/images//project_showcase.gif)

![Mobile splash](/images/splash_m.png)
![Desktop splash](/images/splash_d.png)
![Mobile home](/images/home_m.png)
![Desktop home](/images/home_d.png)
![Mobile catalogue index](/images/catalogue_index_m.png)
![Desktop catalogue index](/images/catalogue_index_d.png)
![Mobile catalogue grid](/images/catalogue_grid_m.png)
![Desktop catalogue grid](/images/catalogue_grid_d.png)
![Mobile product](/images/product_m.png)
![Desktop product](/images/product_d.png)
![Mobile cart](/images/cart_m.png)
![Desktop cart](/images/cart_d.png)
![Mobile contact](/images/contact_m.png)
![Desktop contact](/images/contact_d.png)
![Mobile information](/images/information_m.png)
![Desktop information](/images/information_d.png)

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

Fifth, seed the data. Encryption key is `test`:

```bash
npm run strapi import export_20240901235107.tar.gz.enc 
```

Sixth, set up the frontend by generating a Strapi API token `STRAPI_API_KEY` from the dashboard at [http://localhost:1337/admin](http://localhost:1337/admin)

Seventh, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Eighth, generate API Keys from Stripe by going to the [Stripe Dashboard](https://dashboard.stripe.com/), navigate to the API keys section and copy the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`. Add the keys to the `.env` file in the root folder.