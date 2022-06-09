import styled from 'styled-components'

const ProdutoWrapper = styled.section`
  i {
    margin-right: 10px;
    display: inline-block;
  }

  .flex {
    justify-content: flex-start;
  }
`

export const Categorias = styled.div`
  padding: 20px 0;

  span:not(:last-child)::after {
    content: '>';
    margin: 0 10px;
    display: inline-block;
  }
`

export const NaoEncontrado = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
`

export const Produto = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`

export const Imagem = styled.div`
  box-sizing: border-box;
  padding: 20px;
  text-align: center;

  img {
    width: 70%;
  }
`

export const Informacoes = styled.div`
  box-sizing: border-box;
  padding: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

export const Nome = styled.p`
  font-size: 25px;
  margin-bottom: 10px;
`

export const Marca = styled.p`
  color: gray;
  font-size: 14px;
  margin-bottom: 25px;

  b {
    color: black;
  }
`

export const AdicionarCarrinho = styled.div`
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
`

export const Preco = styled.div`
  margin-bottom: 25px;

  p {
    flex: 1;
    font-weight: 700;
    color: rgb(30, 91, 198);
    font-size: 28px;
  }
`

export const Condicoes = styled.div`
  margin-bottom: 25px;
`

export const Descricao = styled.div`
  font-size: 15px;
`

export default ProdutoWrapper
