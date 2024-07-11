import data from "@/public/chairs.json";

export default function Page({ params }) {
    const currentProduct = data.find((item) => params.slug === item.urlHandle );
    console.log('current item', currentProduct);

    return (
        <h1>{params.slug}</h1>
    )
}