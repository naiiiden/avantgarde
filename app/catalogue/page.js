import 'dotenv/config';
import ProductsList from "@/components/ProductsList/ProductsList";

import Link from 'next/link';
import Image from 'next/image';

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

    console.log('fetched data: ', data.data);
    console.log('product: ', data.data[0].attributes.productImage);

    return (
        <main className="main-reveal px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <ProductsList searchParams={searchParams} data={data.data}/>
        </main>
    )
}