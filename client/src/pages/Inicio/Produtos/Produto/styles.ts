import styled from 'styled-components'

const ProdutoWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .imagem {
    width: 90%;

    img {
      width: 100%;
    }
  }

  p, .nome  {
    margin-bottom: 10px;
  }

  .nome {
    color: #666666;
    text-decoration: none;
  }

  .preco {
    color: #205bc6;
    font-weight: bold;
    font-size: 20px;
  }

  .acao {
    height: 50px;

    p {
      text-align: center;
      color: rgb(64, 170, 96);
      font-size: 12px;
      margin: 5px 0;
    }
  }
`

export default ProdutoWrapper
