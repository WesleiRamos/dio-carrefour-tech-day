import styled from "styled-components";

const ItemWrapper = styled.div`
  display: grid;
  gap: 20px;
  font-size: 14px;
  padding: 16px 0;
  grid-template-columns: 67px 1fr;

  .imagem {
    width: 62px;
    height: 62px;

    img {
      width: 100%;
    }
  }

  .informacoes {
    flex: 1;

    .flex {
      margin-bottom: 10px;
      align-items: flex-start;
    }

    .remover {
      color: rgb(232, 31, 37);
    }
    
    .quantidade {
      width: 100px;
      height: 32px;
      padding: 10px;
    }

    .total {
      font-size: 16px;
      font-weight: 700;
      color: rgb(32, 91, 198);
    }
  }
`

export default ItemWrapper
