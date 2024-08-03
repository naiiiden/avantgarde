import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    const removeItemFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    )
}