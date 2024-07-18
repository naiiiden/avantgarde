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
            {/* <ProductsList searchParams={searchParams}/> */}
            <Link className="flex py-2 text-sm xl:text-base" href={`product/${data.data[0].attributes.productUrlHandle}`}>
                {/* <Image className="max-w-24 sm:max-w-32 lg:max-w-40" src={item.image} width={1500} height={1500} alt="" /> */}
                <div className="p-1.5 flex gap-2 md:gap-4 xl:gap-6 2xl:gap-8 flex-grow">
                    <h2 className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">{data.data[0].attributes.productName}</h2>
                    <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">{data.data[0].attributes.productCreator}</p>
                    <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">{data.data[0].attributes.productMedium}</p>
                    <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">{data.data[0].attributes.productDimensions}</p>
                    <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">€{data.data[0].attributes.productPrice}</p>
                </div>
            </Link>
        </main>
    )
}