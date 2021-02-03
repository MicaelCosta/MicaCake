import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import CartContext from "../../Context/CartContext";

import { Container, Logo, Cart } from "./styles";

function Header() {
  const { cart } = useContext(CartContext);

  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{`${cart.length} itens`}</span>
        </div>

        <MdShoppingBasket size={36} color="#333" />
      </Cart>
    </Container>
  );
}

export default Header;
