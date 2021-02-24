import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "./components";
import Routes from "./routes";

import GlobalStyle, { Container } from "./styles/global";

import { CartContextProvider } from "./Context/CartContext";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />

      <CartContextProvider>
        <Header />

        <Container>
          <Routes />
        </Container>
      </CartContextProvider>

      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
