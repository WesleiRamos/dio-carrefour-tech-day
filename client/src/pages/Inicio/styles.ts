import styled from 'styled-components'

const InicioWrapper = styled.section`
  .produtos {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .informacoes {
    padding: 20px 0;
  }
`

export default InicioWrapper
