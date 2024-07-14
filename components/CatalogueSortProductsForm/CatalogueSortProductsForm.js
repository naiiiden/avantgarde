"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function CatalogueSortProductsForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [productFilter, setProductFilter] = useState('');

    function handleSort(type) {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', type);
        console.log("params: ", params.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="pb-4 flex flex-wrap gap-x-2 justify-end">
            <p>Sort by:</p>
            <label>
                <input checked={productFilter === "alphabeticalAtoZ"} onChange={(e) => (setProductFilter(e.target.id), handleSort(e.target.id))} name="sort-by" id="alphabeticalAtoZ" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, A-Z</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={productFilter === "alphabeticalZtoA"} onChange={(e) => (setProductFilter(e.target.id), handleSort(e.target.id))} name="sort-by" id="alphabeticalZtoA" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, Z-A</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={productFilter === "priceAscending"} onChange={(e) => (setProductFilter(e.target.id), handleSort(e.target.id))} name="sort-by" id="priceAscending" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price ascending</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={productFilter === "priceDescending"} onChange={(e) => (setProductFilter(e.target.id), handleSort(e.target.id))} name="sort-by" id="priceDescending" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price descending</span>
            </label>
        </form>
    )
}