import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
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