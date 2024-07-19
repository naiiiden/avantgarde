import Header from "@/components/Header/Header";
import HeaderGutter from "@/components/Header/HeaderGutter";
import Image from "next/image";

async function getData(slug) {
    const res = await fetch(`http://localhost:1337/api/products?filters[productUrlHandle][$eq]=${slug}&populate=productImage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
        },
        next: {
            revalidate: 3600
        }
    });

    if (!res.ok) {
        throw new Error('failed to fetch data');
    }

    return res.json();
}

export default async function Page({ params }) {
    let currentProduct;

    try {
        currentProduct = await getData(params.slug);
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    return (
        <>
            <Header className={"fixed invert"}/>
            <HeaderGutter/>
            <main className="main-reveal px-4 pb-4 flex flex-col gap-4 lg:flex-row">
                {currentProduct && currentProduct.data.length > 0 ?
                    <>
                        <Image className="lg:w-9/12 xl:w-4/5 2xl:w-5/6" src={`http://localhost:1337${currentProduct.data[0].attributes.productImage.data.attributes.url}`} width={3000} height={3000} alt=""/>
                        <div>
                            <div className="sticky top-[51.25px]">
                                <h1><span className="font-semibold">{currentProduct.data[0].attributes.productName}</span> by {currentProduct.data[0].attributes.productCreator}</h1>
                                <p><span className="font-semibold">Year:</span> {currentProduct.data[0].attributes.productDate}</p> 
                                <p><span className="font-semibold">Material(s):</span> {currentProduct.data[0].attributes.productMedium}</p>
                                <p><span className="font-semibold">Dimensions: </span>{currentProduct.data[0].attributes.productDimensions}</p>
                                <p><span className="font-semibold">Price:</span> €{currentProduct.data[0].attributes.productPrice}</p>
                                <button className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase">Add to cart</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center w-full">
                            <h1 className="font-semibold text-2xl">Product Not Found</h1>
                            <p>The product you are looking for does not exist.</p>
                        </div>
                    </>
                }
            </main>
        </>
    )
}