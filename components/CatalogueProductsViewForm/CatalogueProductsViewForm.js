"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CatalogueProductsViewForm({ currentView }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleSort(type) {
        const params = new URLSearchParams(searchParams);
        params.set('view', type);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="pb-4 flex flex-wrap gap-x-2 justify-end">
            <p className="font-semibold">View:</p>
            <label className="relative">
                <input checked={currentView === "grid"} onChange={(e) => handleSort(e.target.id)} name="view" id="grid" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">grid</span>
                <span aria-hidden="true">,</span>
            </label>
            <label className="relative">
                <input checked={currentView === "index"} onChange={(e) => handleSort(e.target.id)} name="view" id="index" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">index</span>
            </label>
        </form>
    )
}