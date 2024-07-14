import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function Page() {
    return (
        <main className="px-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <div className="flex flex-wrap justify-between gap-4">
                <p className="w-fit">{data.length} products</p>
                <form className="pb-4 flex flex-wrap gap-x-2 justify-end">
                    <p>Sort by:</p>
                    <label>
                        <input name="sort-by" id="alphabeticalAtoZ" className="peer opacity-0 absolute" type="radio"/>
                        <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, A-Z</span>
                        <span aria-hidden="true">,</span>
                    </label>
                    <label>
                        <input name="sort-by" id="alphabeticalZtoA" className="peer opacity-0 absolute" type="radio"/>
                        <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, Z-A</span>
                        <span aria-hidden="true">,</span>
                    </label>
                    <label>
                        <input name="sort-by" id="priceAscending" className="peer opacity-0 absolute" type="radio"/>
                        <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price ascending</span>
                        <span aria-hidden="true">,</span>
                    </label>
                    <label>
                        <input name="sort-by" id="priceDescending" className="peer opacity-0 absolute" type="radio"/>
                        <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price descending</span>
                    </label>
                </form>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.map((item, index) =>
                    <li key={index} className="relative">
                        <Link href={`product/${item.urlHandle}`}>
                            <Image className="" src={item.image} width={1500} height={1500} alt=""/>
                            <h2 className="top-0 p-1.5 text-sm">{item.name}</h2>
                        </Link>
                    </li>
                )}
            </ul>
        </main>
    )
}