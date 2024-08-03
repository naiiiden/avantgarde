"use client";
import { CartContext } from "@/app/context/CartContext";
import { useContext, useState } from "react";

export default function ProductsInCart({  }) {
    const { cart, changeItemQuantity, removeItemFromCart } = useContext(CartContext);

    console.log(1, cart);

    return (
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
    )
}