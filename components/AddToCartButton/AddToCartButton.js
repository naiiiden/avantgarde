"use client";
import { CartContext } from "@/app/context/CartContext";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

export default function AddToCartButton({ productToAdd }) {
    const { cart, addToCart } = useContext(CartContext);
    const [buttonText, setButtonText] = useState("Add to cart");

    useEffect(() => {
        const isProductInCart = cart.some(item => item.id === productToAdd.id);

        if (isProductInCart) {
            setButtonText("Go to cart");
        } else {
            setButtonText("Add to cart");
        }
    }, [cart, productToAdd]);

    console.log(productToAdd);

    return buttonText === "Add to cart" ? 
        <button onClick={() => addToCart(productToAdd)} className="mt-4 font-semibold bg-black text-white w-full p-2 uppercase flex items-center justify-center gap-2">
                {buttonText} <span className="text-sm opacity-65">[ €{productToAdd.attributes.price} ]</span>
        </button>
        :    
        <Link className="block text-center mt-4 font-semibold bg-black text-white w-full p-2 uppercase" href="/cart">{buttonText}</Link>
}