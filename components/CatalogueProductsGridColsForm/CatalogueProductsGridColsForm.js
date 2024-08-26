"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CatalogueProductsGridColsForm({ currentView }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleSort(type) {
        const params = new URLSearchParams(searchParams);
        params.set('cols', type);
        console.log("params: ", params.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="flex">
            (
            <div className="pb-4 flex flex-wrap gap-x-2 justify-end">
                <p className="font-semibold">cols:</p>
                <label className="relative md:hidden">
                    <input checked={currentView === "1"} onChange={(e) => handleSort(e.target.id)} name="view" id="1" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                    <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">1</span>
                    <span aria-hidden="true">,</span>
                </label>
                <label className="relative lg:hidden">
                    <input checked={currentView === "2"} onChange={(e) => handleSort(e.target.id)} name="view" id="2" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                    <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">2</span>
                    <span className="hidden md:inline-block" aria-hidden="true">,</span>
                </label>
                <label className="relative hidden md:block">
                    <input checked={currentView === "3"} onChange={(e) => handleSort(e.target.id)} name="view" id="3" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                    <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">3</span>
                    <span aria-hidden="true" className="md:hidden lg:inline-block">,</span>
                </label>
                <label className="relative hidden lg:block">
                    <input checked={currentView === "4"} onChange={(e) => handleSort(e.target.id)} name="view" id="4" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                    <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">4</span>
                    <span aria-hidden="true" className="hidden xl:inline-block">,</span>
                </label>
                <label className="relative hidden xl:block">
                    <input checked={currentView === "5"} onChange={(e) => handleSort(e.target.id)} name="view" id="5" className="peer opacity-0 w-full h-full absolute cursor-pointer" type="radio"/>
                    <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline">5</span>
                    <span aria-hidden="true"></span>
                </label>
            </div>
            )
        </form>
    )
}