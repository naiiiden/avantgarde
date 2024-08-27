import Link from "next/link";
import Image from "next/image";
import CatalogueProductsViewForm from "@/components/CatalogueProductsViewForm/CatalogueProductsViewForm";
import CatalogueSortProductsForm from "@/components/CatalogueSortProductsForm/CatalogueSortProductsForm";
import ProductsListGrid from "./ProductsListGrid";

export default function ProductsList({ searchParams, data }) {

    if (!searchParams.view) {
        searchParams.view = 'grid';
    }

    if (!searchParams.sortBy) {
        searchParams.sortBy = 'alphabeticalAtoZ';
    }

    switch (searchParams.sortBy) {
        case "alphabeticalAtoZ":
            data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
            break;
        case "alphabeticalZtoA":
            data.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
            break;
        case "priceAscending":
            data.sort((a, b) => a.attributes.price - b.attributes.price);
            break;
        case "priceDescending":
            data.sort((a, b) => b.attributes.price - a.attributes.price);
            break;
        default:
            break;
    }

    return (
        <>
            <div className="flex flex-wrap justify-between gap-4 text-sm">
                <p className="w-fit">{data.length} {data.length > 1 ? 'products' : 'product'}</p>
                <CatalogueSortProductsForm currentSortBy={searchParams.sortBy}/>
                <CatalogueProductsViewForm currentView={searchParams.view}/>
            </div>
            <ProductsListGrid searchParams={searchParams} data={data} defaultCols={5}/>
            {searchParams.view === "index" &&
                <>
                    <div className="flex font-semibold">
                        <div className="min-w-24 sm:min-w-32 lg:min-w-40"></div>
                        <div className="px-1.5 flex flex-grow gap-2 md:gap-4 xl:gap-6 2xl:gap-8">
                            <p className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">Piece:</p>
                            <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">Designer:</p>
                            <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">Material(s):</p>
                            <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">Dimensions:</p>
                            <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">Price:</p>
                        </div>
                    </div>
                    <ul className="products-list-reveal grid">
                        {data.map((item, index) =>
                            <li key={index} className="border-b last:border-b-0 border-black transition-all duration-500 group">
                                <Link className="flex py-2 text-sm" href={`product/${item.attributes.urlHandle}`}>
                                    {item.attributes?.image?.data?.attributes?.url ? (
                                        <Image unoptimized className="w-full max-w-24 sm:max-w-32 lg:max-w-40 group-hover:max-w-28 group-hover:sm:max-w-44 group-hover:lg:max-w-56 group-hover:xl:max-w-60 group-focus-within:max-w-28 group-focus-within:sm:max-w-44 group-focus-within:lg:max-w-56 group-focus-within:xl:max-w-60 transition-all duration-500" src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} priority width={200} height={200} alt="" />
                                    ) : (
                                        <div className="min-h-28 grid place-content-center text-xs w-full max-w-24 sm:max-w-32 lg:max-w-40 text-center">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                                            Image not available
                                        </div>
                                    )}
                                    <div className="p-1.5 flex gap-2 md:gap-4 xl:gap-6 2xl:gap-8 flex-grow">
                                        <h2 className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.name}</h2>
                                        <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.creator}</p>
                                        <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.medium}</p>
                                        <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.dimensions}</p>
                                        <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">€{item.attributes.price}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </>
            }
        </>
    )
}