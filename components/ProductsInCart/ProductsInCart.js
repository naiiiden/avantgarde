"use client";
import { CartContext } from "@/app/context/CartContext";
import { useContext, useState } from "react";

export default function ProductsInCart({  }) {
    const { cart, removeItemFromCart } = useContext(CartContext);

    console.log(1, cart);

    return (
        <ul>
            {cart.map((item, index) => 
                <li key={index}>
                    <span>{item.attributes.name}</span>
                    <button onClick={() => removeItemFromCart(item.id)}>delete item</button>
                </li>
            )}            
        </ul>
    )
}