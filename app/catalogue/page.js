import 'dotenv/config';
import ProductsList from "@/components/ProductsList/ProductsList";

async function getData() {
    const res = await fetch('http://localhost:3333/api/products?populate=productImage&pagination[pageSize]=99', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
        },
        next: {
            revalidate: 3600
        }
    });

    if (!res.ok) {
        throw new Error('failed to fetch data');
    }

    return res.json();
}

export default async function Page({ searchParams }) {
    const data = await getData();

    console.log('fetched data: ', data.data);

    return (
        <main className="main-reveal px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <ProductsList searchParams={searchParams} data={data.data}/>
        </main>
    )
}