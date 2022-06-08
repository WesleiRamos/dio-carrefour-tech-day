import Carrinho from '../Carrinho'
import Cabecalho from '../Cabecalho'
import Router from '../../pages/Router'
import { StoreProvider } from '../../store'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <Cabecalho />
      <Carrinho />  
      <Router />
    </BrowserRouter>
  </StoreProvider>
)

export default App
