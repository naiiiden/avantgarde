"use client";
import { CartContext } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function ProductsInCart() {
    const { cart, changeItemQuantity, removeItemFromCart } = useContext(CartContext);

    console.log(1, cart);

    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.attributes.price * item.quantity;
    });

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <>
            {cart.length === 0 ? 
                <div className="text-center">
                    <p className="border-b border-black pb-1 mb-1 text-2xl font-semibold lg:border-0">Your cart is empty</p>
                    <Link href="/catalogue">View Catalogue</Link>
                </div>
                :
                <div className="ml-auto max-w-5xl">
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
                                        <button className="underline uppercase text-xs opacity-65 hover:opacity-100" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                        <p>€{item.attributes.price}</p>
                                    </div>
                                </div>
                            </li>
                        )}            
                    </ul>
                    <form action="/api/checkout_sessions" method="POST">
                        <button type="submit" className="lg:w-4/5 lg:ml-auto sticky bottom-4 font-semibold bg-black text-center text-white w-full flex items-center justify-center gap-2 p-4 mt-2 uppercase">Checkout <span className="text-sm opacity-65">[ €{totalCost} ]</span></button>
                    </form>
                </div>
            }
        </>
    )
}