import styled from "styled-components";

const CarrinhoWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(32, 91, 198, 0.5);
  z-index: 2;
  
  .content {
    background-color: white;
    width: 400px;
    height: 100%;
    float: right;
    display: flex;
    flex-direction: column;

    .cabecalho {
      box-sizing: border-box;
      color: white;
      display: flex;
      padding: 16px;
      justify-content: space-between;
      background-color: rgb(32, 91, 198);
    }

    .itens {
      box-sizing: border-box;
      padding: 0px 16px;
      overflow: auto;
      flex: 1;
    }

    .subtotal {
      box-sizing: border-box;
      padding: 16px;
      background-color: white;
      box-shadow: rgb(0 0 0 / 15%) 0px 0px 12px;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      .preco {
        color: rgb(32, 91, 198);
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .btn {
        margin-top: 20px;
        background-color: rgb(64, 170, 96);
      
        &:hover {
          background-color: rgb(108, 212, 140);
        }
      }
    }
  }
`

export default CarrinhoWrapper
