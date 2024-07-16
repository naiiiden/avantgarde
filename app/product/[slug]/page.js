import { notFound } from "next/navigation";
import data from "@/public/chairs.json";
import Header from "@/components/Header/Header";
import HeaderGutter from "@/components/Header/HeaderGutter";
import Image from "next/image";

export default function Page({ params }) {
    const currentProduct = data.find((item) => params.slug === item.urlHandle );
    console.log('current item', currentProduct);

    if (!data.map(item => item.urlHandle).includes(params.slug)) {
        notFound();
    }

    return (
        <>
            <Header className={"fixed invert"}/>
            <HeaderGutter/>
            <main className="px-4 pb-4 lg:flex gap-4">
                <Image className="lg:w-9/12 xl:w-4/5 2xl:w-5/6" src={currentProduct.image} width={1500} height={1500} alt=""/>
                <div>
                    <div className="sticky top-0 lg:text-sm 2xl:text-base">
                        <h1 className="font-semibold">{currentProduct.name}</h1>
                        <p>by {currentProduct.creator}</p>
                        <p>Material(s): {currentProduct.medium}</p>
                        <p>Dimensions: {currentProduct.dimensions}</p>
                        <p className="font-semibold">€{currentProduct.price}</p>
                    </div>
                </div>
            </main>
        </>
    )
}