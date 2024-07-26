import Header from "@/components/Header/Header";
import HeaderGutter from "@/components/Header/HeaderGutter";
import Image from "next/image";
import { getData } from "@/app/utilities/getData";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    let currentProduct;

    try {
        currentProduct = await getData(`http://localhost:1337/api/products?filters[urlHandle][$eq]=${params.slug}&populate=image`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    if (!currentProduct || currentProduct.data.length === 0) {
        notFound();
    }

    return (
        <>
            <Header/>
            <HeaderGutter/>
            <main className="main-reveal px-4 pb-4 flex flex-col gap-4 lg:flex-row">
                <Image blurDataURL={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="w-auto lg:max-w-[75%] xl:max-w-[80%] 2xl:max-w-[83.333333%]" priority src={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} width={2000} height={2000} alt=""/>
                <div className="flex-grow">
                    <div className="sticky top-[51.25px] max-w-96 ml-auto lg:pl-1">
                        <h1><span className="font-semibold">{currentProduct.data[0].attributes.name}</span> by {currentProduct.data[0].attributes.creator}</h1>
                        <p><span className="font-semibold">Year:</span> {currentProduct.data[0].attributes.date}</p> 
                        <p><span className="font-semibold">Material(s):</span> {currentProduct.data[0].attributes.medium}</p>
                        <p><span className="font-semibold">Dimensions: </span>{currentProduct.data[0].attributes.dimensions}</p>
                        <p><span className="font-semibold">Price:</span> €{currentProduct.data[0].attributes.price}</p>
                        <button className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase">Add to cart</button>
                    </div>
                </div>
            </main>
        </>
    )
}