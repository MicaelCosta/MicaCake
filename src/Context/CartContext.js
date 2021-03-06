import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { formatPrice } from "../util/format";

const CartContext = React.createContext({});

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);

    const removeFromCart = useCallback((id) => {
        setCart(prevState => {
            toast.success("Produto removido do carrinho!");

            return prevState.filter(x => x.id !== id);
        });
    }, []);

    const updateAmount = useCallback(async (id, amount) => {
        if (amount === 0) {
            removeFromCart(id);
            return;
        }

        const { data: stock } = await api.get(`/stock/${id}`);
        const stockAmount = stock.amount;

        if (amount > stockAmount) {
            toast.error("Quantidade solicitada fora do estoque!");
            return;
        }

        setCart((prevState) => {
            return prevState.map(item => ({
                ...item,
                amount: item.id === id ? amount : item.amount
            }));
        });
    }, [removeFromCart]);

    const addToCart = useCallback(async (id) => {
        //Verifica se o produto já existe no carrinho
        const productExists = cart.find((x) => x.id === id);

        //consulta o stock antes de qualquer alteração
        const { data: stock } = await api.get(`/stock/${id}`);

        const stockAmount = stock.amount;
        const currentAmount = productExists ? productExists.amount : 0;

        const amount = currentAmount + 1;
        if (amount > stockAmount) {
            toast.error("Quantidade solicitada fora do estoque!");
            return;
        }

        if (productExists) {
            await updateAmount(id, amount);

            toast.success("Produto adicionado ao carrinho!");
        } else {
            const response = await api.get(`/products/${id}`);

            const data = {
                ...response.data,
                amount: 1, //insere quantidade 1
                priceFormatted: formatPrice(response.data.price),
            };

            setCart(prevState => [...prevState, data]);

            toast.success("Produto adicionado ao carrinho!");
        }
    }, [cart, updateAmount]);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateAmount,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
} 
