import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";
import CatalogueSortProductsForm from "@/components/CatalogueSortProductsForm/CatalogueSortProductsForm";
import CatalogueProductsViewForm from "@/components/CatalogueProductsViewForm/CatalogueProductsViewForm";
import ProductsList from "@/components/ProductsList/ProductsList";

export default function Page({ searchParams }) {
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
        <main className="px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <div className="flex flex-wrap justify-between gap-4">
                <p className="w-fit">{data.length} {data.length > 1 ? 'products' : 'product'}</p>
                <CatalogueSortProductsForm currentView={searchParams.sortBy}/>
                <CatalogueProductsViewForm currentView={searchParams.view}/>
            </div>
            <ProductsList searchParams={searchParams}/>
        </main>
    )
}