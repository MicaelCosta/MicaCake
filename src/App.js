import React, { useState, useCallback } from "react";
import { Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "./services/api";
import { formatPrice } from "./util/format";

import { Header } from "./components";
import Routes from "./routes";
import history from "./services/history";

import GlobalStyle from "./styles/global";

import CartContext from "./Context/CartContext";

function App() {
  const [cart, setCart] = useState([]);

  const updateAmount = useCallback(async (id, amount) => {
    if (amount <= 0) return;

    const { data: stock } = await api.get(`/stock/${id}`);
    const stockAmount = stock.amount;

    if (amount > stockAmount) {
      toast.error("Quantidade solicitada fora do estoque!");
      return;
    }

    setCart((prevState) => {
      const productIndex = prevState.findIndex((x) => x.id === id);
      if (productIndex >= 0) {
        prevState[productIndex].amount = Number(amount);
      }

      return prevState;
    });
  }, []);

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

  const removeFromCart = useCallback((id) => {
    setCart(prevState => {
      const productIndex = prevState.findIndex(x => x.id === id);
  
      if(productIndex >= 0){
        prevState.splice(productIndex, 1);

        toast.success("Produto removido do carrinho!");
      }

      return prevState;
    });
  }, []);

  return (
    <Router history={history}>

      <CartContext.Provider 
        value={{
          cart,
          addToCart,
          updateAmount,
          removeFromCart
        }}
      >
        <Header />
        <Routes />
      </CartContext.Provider>

      <GlobalStyle />

      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
