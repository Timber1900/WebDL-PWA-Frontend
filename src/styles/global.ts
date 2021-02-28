import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: var(--white);
    font-family: Roboto;
  }

  html {
    width: 100vw;
    height: 100vh;
  }

  body {
    background-color: var(--black);
    overflow: hidden;
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }

  :root {
    --white: #e8e6e3;
    --almost-white: #CED4DA;
    --light-grey: #ADB5BD;
    --regular-grey: #6C757D;
    --dark-grey: #495057;
    --almost-black: #343A40;
    --black: #212529;
    --blue: #48cae4;
  }
`;
