import { notFound } from "next/navigation";
import data from "@/public/chairs.json";

export default function Page({ params }) {
    const currentProduct = data.find((item) => params.slug === item.urlHandle );
    console.log('current item', currentProduct);

    if (!data.map(item => item.urlHandle).includes(params.slug)) {
        notFound();
    }

    return (
        <h1>{params.slug}</h1>
    )
}