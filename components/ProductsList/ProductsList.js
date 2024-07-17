"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CatalogueProductsViewForm from "@/components/CatalogueProductsViewForm/CatalogueProductsViewForm";
import CatalogueSortProductsForm from "@/components/CatalogueSortProductsForm/CatalogueSortProductsForm";

import data from "@/public/chairs.json";

export default function ProductsList({ searchParams }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (!searchParams.view) {
        searchParams.view = 'grid';
    }

    if (!searchParams.sortBy) {
        searchParams.sortBy = 'alphabeticalAtoZ';
    }

    switch (searchParams.sortBy) {
        case "alphabeticalAtoZ":
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "alphabeticalZtoA":
            data.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "priceAscending":
            data.sort((a, b) => a.price - b.price);
            break;
        case "priceDescending":
            data.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }

    return (
        <>
            <div className="flex flex-wrap justify-between gap-4">
                <p className="w-fit">{data.length} {data.length > 1 ? 'products' : 'product'}</p>
                <CatalogueSortProductsForm currentView={searchParams.sortBy}/>
                <CatalogueProductsViewForm currentView={searchParams.view}/>
            </div>
            {searchParams.view === "grid" &&
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map((item, index) =>
                        <li key={index} className={`transition-opacity duration-300 ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-10' : ''}`}>
                            <Link href={`product/${item.urlHandle}`} 
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onFocus={() => setHoveredIndex(index)}
                                onBlur={() => setHoveredIndex(null)}>
                                <Image className="" src={item.image} width={1500} height={1500} alt="" />
                                <h2 className="top-0 p-1.5 text-sm">{item.name}</h2>
                            </Link>
                        </li>
                    )}
                </ul>
            }
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
                    <ul className="grid">
                        {data.map((item, index) =>
                            <li key={index} className={`border-b last:border-b-0 border-black transition-opacity duration-300 ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-10' : ''}`}>
                                <Link className="flex py-2 text-sm xl:text-base" href={`product/${item.urlHandle}`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onFocus={() => setHoveredIndex(index)}
                                    onBlur={() => setHoveredIndex(null)}>
                                    <Image className="max-w-24 sm:max-w-32 lg:max-w-40" src={item.image} width={1500} height={1500} alt="" />
                                    <div className="p-1.5 flex gap-2 md:gap-4 xl:gap-6 2xl:gap-8 flex-grow">
                                        <h2 className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">{item.name}</h2>
                                        <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.creator}</p>
                                        <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.medium}</p>
                                        <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.dimensions}</p>
                                        <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">€{item.price}</p>
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