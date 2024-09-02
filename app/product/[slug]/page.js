import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getData } from "@/app/utilities/getData";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import HeaderHeightStickyVal from "@/components/Utils/HeaderHeightStickyVal";
import CustomCursor from "@/components/CustomCursor/CustomCursor";

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

export default async function Page({ params, searchParams }) {
    const data = await getData('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99');

    const sortBy = searchParams.sortBy || 'alphabeticalAtoZ';

    let sortedData = [...data.data];

    switch (sortBy) {
        case 'alphabeticalAtoZ':
            sortedData.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
            break;
        case 'alphabeticalZtoA':
            sortedData.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
            break;
        case 'priceAscending':
            sortedData.sort((a, b) => a.attributes.price - b.attributes.price);
            break;
        case 'priceDescending':
            sortedData.sort((a, b) => b.attributes.price - a.attributes.price);
            break;
        default:
            break;
    }

    const currentProductIndex = sortedData.findIndex((product) => decodeURIComponent(params.slug) === product.attributes.urlHandle);

    const currentProduct = sortedData[currentProductIndex];

    if (!currentProduct || currentProductIndex === -1) {
        notFound();
    }

    const previousProductIndex = (currentProductIndex - 1 + sortedData.length) % sortedData.length;
    const nextProductIndex = (currentProductIndex + 1) % sortedData.length;

    const previousProduct = sortedData[previousProductIndex];
    const nextProduct = sortedData[nextProductIndex];

    return (
        <main className="mt-auto max-w-4xl ml-auto">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl max-lg:px-4 mt-6 mb-10">{currentProduct.attributes.name} by {currentProduct.attributes.creator}, {currentProduct.attributes.date}</h1>
            <div className="grid gap-4">
                {currentProduct.attributes?.image?.data?.attributes?.url ? (
                    <Image blurDataURL={`http://localhost:1337${currentProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="w-full" priority src={`http://localhost:1337${currentProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt=""/>
                ) : (
                    <div className="text-center text-xs w-full">
                        <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                        Image not available
                    </div>
                )}
                <div className={`px-4 lg:pl-0 lg:text-lg pb-4`}>
                    {currentProduct.attributes.description !== null && <p className="mb-4">{currentProduct.attributes.description}</p>}
                    <p><span className="font-semibold">Material(s):</span> {currentProduct.attributes.medium}</p>
                    <p><span className="font-semibold">Dimensions: </span>{currentProduct.attributes.dimensions}</p>
                    <AddToCartButton productToAdd={currentProduct}/>
                </div>
                <div className="mt-20 lg:mt-40 flex justify-end">
                    {previousProduct && <Link data-cursor-text="Previous product" className="transition-all duration-500 opacity-50 hover:opacity-100 focus-visible:opacity-100 w-1/3 md:w-1/4" href={`/product/${previousProduct.attributes.urlHandle}?sortBy=${sortBy}`}>
                        <Image blurDataURL={`http://localhost:1337${previousProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="aspect-square object-cover" priority src={`http://localhost:1337${previousProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt="Previous product"/>
                    </Link>}
                    {nextProduct && <Link data-cursor-text="Next product" className="transition-all duration-500 opacity-50 hover:opacity-100 focus-visible:opacity-100 w-1/3 md:w-1/4" href={`/product/${nextProduct.attributes.urlHandle}?sortBy=${sortBy}`}>
                        <Image blurDataURL={`http://localhost:1337${nextProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="aspect-square object-cover" priority src={`http://localhost:1337${nextProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt="Next product"/>
                    </Link>}
                </div>
            </div>
        </main>
    )
}