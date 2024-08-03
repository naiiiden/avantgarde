"use client";
import { CartContext } from "@/app/context/CartContext";
import { useContext, useState } from "react";

export default function ProductsInCart({  }) {
    const { cart, addToCart } = useContext(CartContext);

    console.log(1, cart);

    return (
        <ul>
            {cart.map((item, index) => 
                <li key={index}>{item.attributes.name}</li>
            )}            
        </ul>
    )
}