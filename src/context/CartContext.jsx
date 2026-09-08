import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (product, quantity = 1) => {
        setItems((current) => {
            const existingItem = current.find((item) => item.id === product.id);

            if (existingItem) {
                return current.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...current, { ...product, quantity }];
        });
    };

    const removeItem = (productId) => {
        setItems((current) => current.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems((current) =>
            current.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + Number(item.price || 0) * item.quantity,
        0
    );

    const value = useMemo(
        () => ({
            items,
            totalItems,
            subtotal,
            addItem,
            removeItem,
            updateQuantity,
            clearCart
        }),
        [items, subtotal, totalItems]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}

export default CartContext;
