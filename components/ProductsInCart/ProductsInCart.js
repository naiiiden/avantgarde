"use client";
import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function ProductsInCart() {
    const { cart, changeItemQuantity, removeItemFromCart } = useContext(CartContext);

    console.log(1, cart);

    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.attributes.price * item.quantity;
    });

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cart), // cartItems is your cart data from context
        });
      
        const { url } = await response.json();
        
        if (url) {
          window.location.href = url; // Redirect to Stripe Checkout
        }
      };

    return (
        <>
            {cart.length === 0 ? 
                <div className="text-center">
                    <p className="border-b border-black pb-1 mb-1 text-2xl font-semibold lg:border-0">Your cart is empty</p>
                    <Link href="/catalogue">View Catalogue</Link>
                </div>
                :
                <div className="ml-auto w-full max-w-7xl">
                    <ul className="lg:w-4/5 ml-auto">
                        {cart.map((item, index) =>                    
                            <li className="w-full flex gap-4 border-b last:border-b-0 border-black py-2 first:pt-0" key={index}>
                                <Link href={`product/${item.attributes.urlHandle}`}>
                                    {item.attributes?.image?.data?.attributes?.url ? (
                                            <Image className="w-full min-w-24 sm:min-w-32 lg:min-w-40 max-w-24 sm:max-w-32 lg:max-w-40" src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} width={500} height={500} alt={item.attributes.name}/>
                                        ) : (
                                            <div className="text-xs w-full min-w-24 sm:min-w-32 lg:min-w-40 max-w-24 sm:max-w-32 lg:max-w-40 min-h-64 grid place-content-center text-center group-hover:opacity-[.0225] group-focus-within:opacity-[.0225] transition-opacity duration-500">
                                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                                                Image not available
                                            </div>
                                    )}
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
                                        <button className="underline uppercase font-medium text-xs opacity-65 hover:opacity-100" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                        <p>€{item.attributes.price}</p>
                                    </div>
                                </div>
                            </li>
                        )}            
                    </ul>
                    <form onSubmit={handleCheckout}>
                        <button type="submit" className="lg:w-4/5 lg:ml-auto sticky bottom-4 font-semibold border border-black text-center w-full flex items-center justify-center gap-2 p-4 mt-2 uppercase">Checkout <span className="text-sm opacity-65">[ €{totalCost} ]</span></button>
                    </form>
                </div>
            }
        </>
    )
}