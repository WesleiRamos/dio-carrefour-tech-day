import Input from '../Input'
import CabecalhoWrapper from './styles'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { selectAppState, selectCarrinhoState, alternarCarrinho, removerCep } from '../../store/slices'

const Cabecalho = () => {
  const dispatch = useDispatch<AppDispatch>()
  const appState = useSelector(selectAppState)
  const carrinhoState = useSelector(selectCarrinhoState)
  
  return (
    <CabecalhoWrapper>
      <div className='container flex'>
        <div className='mobile'>
          <i className='gg-menu'/>
        </div>
        
        <div className='logo'>
          <Link to='/'>
            <img
              alt='Carrefour logo'
              src={process.env.REACT_APP_LOGO}
            />
          </Link>
        </div>

        <Input
          className='barra-busca not-mobile'
          placeholder='Pesquise por produtos ou marcas'
        />

        <div className='flex'>
          <div className='cep'>
            <p>Entregar no CEP</p>
            <span onClick={() => dispatch(removerCep())}>
              {appState.cep}
            </span>
          </div>

          <div className='carrinho' onClick={() => dispatch(alternarCarrinho())}>
            <span className='contagem'>
              {carrinhoState.carrinho.length}
            </span>

            <i className='gg-shopping-cart' />
          </div>
        </div>
      </div>

      <div className='container mobile'>
        <Input
          className='barra-busca'
          placeholder='Pesquise por produtos ou marcas'
        />
      </div>
    </CabecalhoWrapper>
  )
}

export default Cabecalho
