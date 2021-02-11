import styled, { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #F5F5F5;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 14px sans-serif;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    button {
        cursor: pointer;
    }
`;

export const Container = styled.div`
    display: flex;
    flex: 1;

    justify-content: center;
`;