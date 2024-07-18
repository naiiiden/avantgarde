import 'dotenv/config';
import ProductsList from "@/components/ProductsList/ProductsList";

async function getData() {
    const res = await fetch('http://localhost:1337/api/products?populate=productImage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
        },
    });

    if (!res.ok) {
        throw new Error('failed to fetch data');
    }

    return res.json();
}

export default async function Page({ searchParams }) {
    const data = await getData();

    console.log('fetched data: ', data[0]?.attributes);

    return (
        <main className="main-reveal px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <ProductsList searchParams={searchParams}/>
        </main>
    )
}