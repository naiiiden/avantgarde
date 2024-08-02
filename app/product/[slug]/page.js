import Image from "next/image";
import { getData } from "@/app/utilities/getData";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";

export async function generateMetadata({ params }) {
    let currentProduct;

    try {
        currentProduct = await getData(`http://localhost:1337/api/products?filters[urlHandle][$eq]=${params.slug}&populate=image`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    if (!currentProduct || currentProduct.data.length === 0) {
        return {
            title: 'Product Not Found | Avantgarde',
        };
    }

    return {
        title: `${currentProduct.data[0].attributes.name} by ${currentProduct.data[0].attributes.creator} | Avantgarde`,
    };
}

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
        <main className="px-4 pb-4 flex flex-col gap-4 lg:flex-row lg:pl-0 lg:pb-0 mt-auto">
            <Image blurDataURL={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="w-auto lg:max-w-[50%] 2xl:max-w-6xl" priority src={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} width={2000} height={2000} alt=""/>
            <div className="flex-grow mt-auto lg:sticky lg:bottom-4">
                <div className="max-w-96 ml-auto lg:pl-1">
                    <h1 className="text-lg"><span className="font-semibold">{currentProduct.data[0].attributes.name}</span> by {currentProduct.data[0].attributes.creator}</h1>
                    <p><span className="font-semibold">Year:</span> {currentProduct.data[0].attributes.date}</p> 
                    <p><span className="font-semibold">Material(s):</span> {currentProduct.data[0].attributes.medium}</p>
                    <p><span className="font-semibold">Dimensions: </span>{currentProduct.data[0].attributes.dimensions}</p>
                    <p><span className="font-semibold">Price:</span> €{currentProduct.data[0].attributes.price}</p>
                    <AddToCartButton/>
                </div>
            </div>
        </main>
    )
}