import styled from 'styled-components'

const CabecalhoWrapper = styled.header`
  box-sizing: border-box;
  background-color: #f0f0f0;
  position: sticky;
  top: 0;

  .barra-busca {
    margin: 0 5%;
    flex: 5;
  }

  .mobile .barra-busca {
    margin: 0;
  }
`

export const Logo = styled.div`
  box-sizing: border-box;
  flex: 1;
  padding-left: 15px;

  @media (max-width: 480px) {
    img {
      width: 28vw;
    }
  }
`


export const CEP = styled.div`
  margin-right: 50px;
  transform: translateY(3px);

  p {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #205BC6;
    }
  }

  @media (max-width: 480px) {
    margin-right: 10px;

    p {
      font-size: 12px;
    }

    span {
      font-size: 14px;
    }
  }
`

export const Carrinho = styled.div`
  i {
    transform: scale(1.8);
  }

  span {
    box-sizing: border-box;
    display: block;
    background-color: #41AA60;
    padding: 2px 10px;
    color: white;
    font-size: 13px;
    border-radius: 10px;
    margin-bottom: -10px;
    margin-left: 10px;
    position: relative;
    z-index: 1;
    width: 35px;
    text-align: center;
  }

  @media (max-width: 480px) {
    transform: scale(0.8);
    transform-origin: right top;
  }
`

export default CabecalhoWrapper