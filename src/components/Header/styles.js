import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  background-color: #FFF;
  width: 100% important;
`;

export const Logo = styled.img.attrs({
  src: logo,
  alt: 'MicaCake'
})`
  height: 60px;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
      opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    span{
        font-size: 12px;
        color: #333;
    }
  }
`;
