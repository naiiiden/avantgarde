"use client";
import { CartContext } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ProductsInCart({  }) {
    const { cart, changeItemQuantity, removeItemFromCart } = useContext(CartContext);

    console.log(1, cart);

    return (
        <>
            {cart.length === 0 ? 
                <div className="text-center">
                    <p className="border-b border-black pb-1 mb-1 text-2xl font-semibold lg:border-0">Your cart is empty</p>
                    <Link href="/catalogue">View Catalogue</Link>
                </div>
                :
                <>
                    <ul className="lg:w-4/5 ml-auto">
                        {cart.map((item, index) =>                    
                            <li className="w-full flex gap-4 border-b last:border-b-0 border-black py-2 first:pt-0" key={index}>
                                <Link href={`product/${item.attributes.urlHandle}`}>
                                    <Image className="max-w-24 sm:max-w-32 lg:max-w-40" src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} width={500} height={500} alt={item.attributes.name}/>
                                </Link>
                                <div className="w-full flex flex-col">
                                    <Link className="font-medium" href={`product/${item.attributes.urlHandle}`}>{item.attributes.name}</Link>
                                    <label className="text-sm uppercase mt-2 mb-4 flex" htmlFor={`quantity-product-${index}`}>
                                        Qty:
                                        <input
                                            className="pl-1 w-10 bg-transparent"
                                            id={`quantity-product-${index}`}
                                            name={`quantity-product-${index}`}
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                if (e.target.value > 0) {
                                                    changeItemQuantity(item.id, parseInt(e.target.value))
                                                }
                                            }}
                                            min="1"
                                        />
                                    </label>
                                    <div className="mt-auto flex justify-between">
                                        <button className="uppercase text-xs" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                        <p>€{item.attributes.price}</p>
                                    </div>
                                </div>
                            </li>
                        )}            
                    </ul>
                    <Link className="lg:w-4/5 lg:ml-auto sticky bottom-4 font-semibold bg-black text-center text-white w-full block p-4 mt-2 uppercase" href="">Checkout</Link>
                </>
            }
        </>
    )
}