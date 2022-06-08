import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  img {
    user-select: none;
    pointer-events: none;
  }

  body {
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  .container {
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    padding: 20px;
    max-width: 1200px;
  }

  .flex {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .modal {
    width: 100vw;
    height: 100vh;
    z-index: 3;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);

    .content {
      padding: 30px;
      border-radius: 5px;
      background-color: white;
    }
  }

  .mobile {
    display: none;
  }

  @media (max-width: 730px) {
    .mobile {
      display: block;
    }

    .not-mobile {
      display: none;
    }
  }
`
 
export default GlobalStyle
