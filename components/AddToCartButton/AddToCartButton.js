"use client";
import { CartContext, CartProvider } from "@/app/context/CartContext";
import { useContext, useState } from "react";

export default function AddToCartButton() {
    const { cart, setCart } = useContext(CartContext);

    console.log(1, cart);

    return (
        <button onClick={() => setCart('test')} className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase">Add to cart</button>
    ) 
}