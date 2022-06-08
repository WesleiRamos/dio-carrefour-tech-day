import styled from 'styled-components'

const ProdutoWrapper = styled.section`
  i {
    margin-right: 10px;
    display: inline-block;
  }

  .flex {
    justify-content: flex-start;
  }

  .nao-encontrado {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 50px;
  }

  .categorias {
    padding: 20px 0;

    span:not(:last-child)::after {
      content: '>';
      margin: 0 10px;
      display: inline-block;
    }
  }

  .produto {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

    .imagem {
      box-sizing: border-box;
      padding: 20px;
      text-align: center;

      img {
        width: 70%;
      }
    }

    .informacoes {
      box-sizing: border-box;
      padding: 30px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;

      .nome {
        font-size: 25px;
        margin-bottom: 10px;
      }

      .marca {
        color: gray;
        font-size: 14px;
        margin-bottom: 25px;

        b {
          color: black;
        }
      }

      .flex.preco {
        margin-bottom: 25px;

        .preco {
          flex: 1;
          font-weight: 700;
          color: rgb(30, 91, 198);
          font-size: 28px;
        }

        .add-carrinho {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 50px;
          flex: 1;

          button {
            height: 100%;
            justify-content: center;
            
            i {
            transform: scale(1.2);
            }
          }

          p {
            text-align: center;
            color: rgb(64, 170, 96);
            font-size: 12px;
            margin: 5px 0;
          }
        }
      }

      .flex.condicoes {
        margin-bottom: 25px;
      }

      .descricao {
        font-size: 15px;
      }
    }
  }
`

export default ProdutoWrapper
