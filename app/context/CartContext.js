import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("avantgardeCart")
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("avantgardeCart", JSON.stringify(cart))
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const isItemAlreadyInCart = prevCart.find(cartItem => cartItem.id === item.id)
            if (isItemAlreadyInCart) {
                return prevCart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    }

    const changeItemQuantity = (itemId, quantity) => {
        setCart((prevCart) => 
            prevCart.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    }

    const removeItemFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, changeItemQuantity, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    )
}