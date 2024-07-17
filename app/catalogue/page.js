import ProductsList from "@/components/ProductsList/ProductsList";

export default function Page({ searchParams }) {
    return (
        <main className="main-reveal px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <ProductsList searchParams={searchParams}/>
        </main>
    )
}