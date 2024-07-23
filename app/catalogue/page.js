import 'dotenv/config';
import ProductsList from "@/components/ProductsList/ProductsList";
import { getData } from '../utilities/getData';

export default async function Page({ searchParams }) {
    const data = await getData('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99');

    return (
        <main className="main-reveal px-4 pb-4 font-medium">
            <h1 className="sr-only">Catalogue</h1>
            <ProductsList searchParams={searchParams} data={data.data}/>
        </main>
    )
}