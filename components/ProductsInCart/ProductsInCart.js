"use client";
import { CartContext } from "@/app/context/CartContext";
import Link from "next/link";
import { useContext, useState } from "react";

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
                <ul>
                    {cart.map((item, index) => 
                        <li key={index}>
                            <span>{item.attributes.name}</span>
                            <button onClick={() => removeItemFromCart(item.id)}>delete item</button>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                    if (e.target.value > 0) {
                                        changeItemQuantity(item.id, parseInt(e.target.value))
                                    }
                                }}
                                min="1"
                            />
                        </li>
                    )}            
                </ul>
            }
        </>
    )
}