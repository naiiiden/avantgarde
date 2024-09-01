import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getData } from "@/app/utilities/getData";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import HeaderHeightStickyVal from "@/components/Utils/HeaderHeightStickyVal";

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
        <main className="mt-auto">
            <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl 4xl:text-7xl px-4 mb-4 sm:mb-10">{currentProduct.attributes.name} by {currentProduct.attributes.creator}, {currentProduct.attributes.date}</h1>
            <div className="lg:px-0 flex flex-col gap-4 lg:flex-row lg:pb-0 mt-auto">
                {currentProduct.attributes?.image?.data?.attributes?.url ? (
                    <Image blurDataURL={`http://localhost:1337${currentProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="w-auto lg:max-w-[40%] 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl" priority src={`http://localhost:1337${currentProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt=""/>
                ) : (
                    <div className="text-center text-xs w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-2xl mx-auto">
                        <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                        Image not available
                    </div>
                )}
                <HeaderHeightStickyVal className={"pb-4"}>
                    <div className={`max-w-[18.75rem] ml-auto text-sm ${!currentProduct.attributes?.image?.data?.attributes?.url ? 'lg:pb-4' : ''}`}>
                        <div className="max-lg:px-4">
                            {currentProduct.attributes.description !== null && <p className="mb-4">{currentProduct.attributes.description}</p>}
                            <p><span className="font-semibold">Material(s):</span> {currentProduct.attributes.medium}</p>
                            <p><span className="font-semibold">Dimensions: </span>{currentProduct.attributes.dimensions}</p>
                        </div>
                    </div>
                    <AddToCartButton productToAdd={currentProduct}/>
                </HeaderHeightStickyVal>
                <div className="max-lg:mt-12 flex-grow mt-auto lg:sticky lg:right-0 lg:bottom-0 flex justify-end items-end lg:flex-row">
                    {previousProduct && <Link className="transition-all duration-500 opacity-65 hover:opacity-100 focus-visible:opacity-100 w-auto max-w-32 hover:max-w-36 focus-visible:max-w-36 xl:max-w-36 xl:hover:max-w-40 xl:focus-visible:max-w-40 3xl:max-w-40 3xl:hover:max-w-44 3xl:focus-visible:max-w-44 4xl:max-w-48 4xl:hover:max-w-52 4xl:focus-visible:max-w-52" href={`/product/${previousProduct.attributes.urlHandle}?sortBy=${sortBy}`}>
                        <Image blurDataURL={`http://localhost:1337${previousProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="aspect-square object-cover" priority src={`http://localhost:1337${previousProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt="Previous product"/>
                    </Link>}
                    {nextProduct && <Link className="transition-all duration-500 opacity-65 hover:opacity-100 focus-visible:opacity-100 w-auto max-w-32 hover:max-w-36 focus-visible:max-w-36 xl:max-w-36 xl:hover:max-w-40 xl:focus-visible:max-w-40 3xl:max-w-40 3xl:hover:max-w-44 3xl:focus-visible:max-w-44 4xl:max-w-48 4xl:hover:max-w-52 4xl:focus-visible:max-w-52" href={`/product/${nextProduct.attributes.urlHandle}?sortBy=${sortBy}`}>
                        <Image blurDataURL={`http://localhost:1337${nextProduct.attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="aspect-square object-cover" priority src={`http://localhost:1337${nextProduct.attributes.image.data.attributes.url}`} width={2000} height={2000} alt="Next product"/>
                    </Link>}
                </div>
            </div>
        </main>
    )
}