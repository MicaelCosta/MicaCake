import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

import CartContext from "../../Context/CartContext";

import { Container, ProductList } from "./styles";

function Home() {
  const { cart, addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  const handleAddProduct = useCallback(async (id) => {
    await addToCart(id);
  }, [addToCart]);

  const amount = useCallback((id) => {
    const item = cart.find(x => x.id === id);
    if(item)
      return item.amount;

    return 0;
  }, [cart]);

  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <li key={String(product.id)}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {amount(product.id) || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </Container>
  );
}

export default Home;
