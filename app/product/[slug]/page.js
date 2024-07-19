import { notFound } from "next/navigation";
import data from "@/public/chairs.json";
import Header from "@/components/Header/Header";
import HeaderGutter from "@/components/Header/HeaderGutter";
import Image from "next/image";

async function getData(slug) {
    const res = await fetch(`http://localhost:1337/api/products?filters[productUrlHandle][$eq]=${slug}&populate=productImage`, {
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

    const data = await res.json();
    console.log(1, data);
}

export default async function Page({ params }) {
    const currentProduct = data.find((item) => params.slug === item.urlHandle );
    console.log('current item', currentProduct);

    const currentProduct2 = await getData(params.slug);
    console.log('params slug: ', params.slug);
    console.log(currentProduct2);


    if (!data.map(item => item.urlHandle).includes(params.slug)) {
        notFound();
    }

    return (
        <>
            <Header className={"fixed invert"}/>
            <HeaderGutter/>
            <main className="main-reveal px-4 pb-4 flex flex-col gap-4 lg:flex-row">
                <Image className="lg:w-9/12 xl:w-4/5 2xl:w-5/6" src={currentProduct.image} width={3000} height={3000} alt=""/>
                <div>
                    <div className="sticky top-[51.25px]">
                        <h1><span className="font-semibold">{currentProduct.name}</span> by {currentProduct.creator}</h1>
                        <p><span className="font-semibold">Year:</span> {currentProduct.date}</p> 
                        <p><span className="font-semibold">Material(s):</span> {currentProduct.medium}</p>
                        <p><span className="font-semibold">Dimensions: </span>{currentProduct.dimensions}</p>
                        <p><span className="font-semibold">Price:</span> €{currentProduct.price}</p>
                        <button className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase">Add to cart</button>
                    </div>
                </div>
            </main>
        </>
    )
}