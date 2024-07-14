import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";
import CatalogueSortProductsForm from "@/components/CatalogueSortProductsForm/CatalogueSortProductsForm";
import CatalogueProductsViewForm from "@/components/CatalogueProductsViewForm/CatalogueProductsViewForm";

export default function Page({ searchParams }) {
    console.log(searchParams);

    // switch (searchParams.view) {
    //     case "index":
    //         data.sort((a, b) => a.name.localeCompare(b.name));
    //         break;
    //     case "grid":
    //         data.sort((a, b) => b.name.localeCompare(a.name));
    //         break;
    //     default:
    //         break;
    // }

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
        <main className="px-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <div className="flex flex-wrap justify-between gap-4">
                <p className="w-fit">{data.length} {data.length > 1 ? 'products' : 'product'}</p>
                <CatalogueSortProductsForm/>
                <CatalogueProductsViewForm/>
            </div>
            {searchParams.view === "grid" && 
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map((item, index) =>
                        <li key={index}>
                            <Link href={`product/${item.urlHandle}`}>
                                <Image className="" src={item.image} width={1500} height={1500} alt=""/>
                                <h2 className="top-0 p-1.5 text-sm">{item.name}</h2>
                            </Link>
                        </li>
                    )}
                </ul>
            }
            {searchParams.view === "index" && 
                <ul className="grid gap-4">
                    {data.map((item, index) =>
                        <li key={index}>
                            <Link href={`product/${item.urlHandle}`}>
                                <Image className="" src={item.image} width={1500} height={1500} alt=""/>
                                <h2 className="top-0 p-1.5 text-sm">{item.name}</h2>
                            </Link>
                        </li>
                    )}
                </ul>
            }
        </main>
    )
}