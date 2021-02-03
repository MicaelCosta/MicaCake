import React from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { formatPrice } from "../util/format";

const cart = [];

async function updateAmount(id, amount) {
  if (amount <= 0) return;

  const { data: stock } = await api.get(`/stock/${id}`);
  const stockAmount = stock.amount;

  if (amount > stockAmount) {
    toast.error("Quantidade solicitada fora do estoque!");
    return;
  }

  const productIndex = cart.findIndex(x => x.id === id);
  if (productIndex >= 0) {
    cart[productIndex].amount = Number(amount);
  }
}

async function addToCart(id) {
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

    cart.push(data);

    toast.success("Produto adicionado ao carrinho!");
  }
}

const LiberacaoTotvsContext = React.createContext({
  cart,
  addToCart,
  updateAmount,
});

export default LiberacaoTotvsContext;
