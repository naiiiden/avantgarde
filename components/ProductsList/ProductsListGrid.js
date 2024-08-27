"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductsListGrid({ searchParams, data, defaultCols }) {
    const [cols, setCols] = useState(defaultCols);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) {
                setCols(1);
            } else if (window.innerWidth < 768) {
                setCols(2);
            } else if (window.innerWidth < 1024) { 
                setCols(3)
            } else if (window.innerWidth < 1280) {
                setCols(4);
            } else {
                setCols(5);
            }
        };

        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);
    
    return (
        <>
            {searchParams.view === "grid" &&
                <ul style={searchParams.cols < 6 ? { gridTemplateColumns: `repeat(${searchParams.cols}, minmax(0, 1fr))` } : undefined} className="products-list-reveal grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data.map((item, index) =>
                        <li key={index} className="relative">
                            <Link className="group" href={`product/${item.attributes.urlHandle}`}>
                                {item.attributes?.image?.data?.attributes?.url ? (
                                        <Image className="group-hover:opacity-[.0225] group-focus-within:opacity-[.0225] transition-opacity duration-500 w-full" unoptimized src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} priority width={1500} height={1500} alt=""/>
                                    ) : (
                                        <div className="text-xs min-h-64 grid place-content-center text-center group-hover:opacity-[.0225] group-focus-within:opacity-[.0225] transition-opacity duration-500">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                                            Image not available
                                        </div>
                                )}
                                <div className="p-1.5 grid gap-2 text-sm absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
                                    <p aria-hidden="true"><span className="font-semibold">Year:</span> {item.attributes.date}</p> 
                                    <p aria-hidden="true"><span className="font-semibold">Material(s):</span> {item.attributes.medium}</p>
                                    <p aria-hidden="true"><span className="font-semibold">Dimensions: </span>{item.attributes.dimensions}</p>
                                </div>
                                <div className="flex text-xs justify-between p-1.5">
                                    <h2><span className="font-semibold">{item.attributes.name}</span> by {item.attributes.creator}</h2>
                                    <div aria-hidden="true" className="top-0 font-bold">{(index + 1).toString().padStart(2, '0')}</div>
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}