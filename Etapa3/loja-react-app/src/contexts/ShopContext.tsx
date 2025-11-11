import React, { createContext, useContext, useState } from "react";

type ShopContextType = {
    cartItems: any[];
    addToCart: (item: any, quantity?: number) => void;
    removeFromCart: (itemId: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
    lastOrderInfo: () => any[];
};

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [orderInfo, setOrderInfo] = useState<any[]>([]);

    const addToCart = (item: any, quantity: number = 1) => {
        setCartItems(prevItems => {
                const existingIndex = prevItems.findIndex(
                    cartItem => cartItem.id === item.id
                );
                if (existingIndex >= 0) {
                    const updatedItems = [...prevItems];
                    if (updatedItems[existingIndex].quantity + quantity > 0) {
                        updatedItems[existingIndex].quantity += quantity;
                    }
                    return updatedItems;
                }
                else {
                    return [...prevItems, {...item, quantity}];
                }

            }
        )
    }

    const removeFromCart = (itemId: number) => {
        setCartItems((prevItems) => 
            prevItems.filter(item => item.id !== itemId)
        );
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const lastOrderInfo = () => {
        return orderInfo;
    }
    return (
        <ShopContext
            value={ { cartItems, addToCart, removeFromCart, getTotalPrice, clearCart, lastOrderInfo } }
        >
            {children}
        </ShopContext>
    );
}

export const useShop = () => useContext(ShopContext);

