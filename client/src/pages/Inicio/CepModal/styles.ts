import styled from 'styled-components'

const CepModalWrapper = styled.section`
  h3 {
    color: #02296d;
    margin-bottom: 20px;

    i {
      display: inline-block;
    }
  }

  p {
    color: #666666;
    margin-bottom: 10px;
  }
`

export const Content = styled.div`
  max-width: 400px;
`

export const Aviso = styled.div`
  text-align: center;
  margin-top: 20px;
  
  p {
    color: black;
    font-weight: bold;
  }
`

export default CepModalWrapper
