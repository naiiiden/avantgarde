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
            <main className="px-4 pb-4 flex flex-col gap-4 lg:flex-row">
                <Image className="lg:w-9/12 xl:w-4/5 2xl:w-5/6" src={currentProduct.image} width={3000} height={3000} alt=""/>
                <div>
                    <div className="sticky top-[51.25px]">
                        <h1><span className="font-semibold">{currentProduct.name}</span> by {currentProduct.creator}</h1>
                        <p><span className="font-semibold">Material(s):</span> {currentProduct.medium}</p>
                        <p><span className="font-semibold">Dimensions: </span>{currentProduct.dimensions}</p>
                        <p><span className="font-semibold">Price:</span> €{currentProduct.price}</p>
                        <button className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase">Add to cart</button>
                    </div>
                </div>
            </main>
        </>
    )
}