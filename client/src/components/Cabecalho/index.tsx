import Input from '../Input'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../store'
import CabecalhoWrapper, * as Style from './styles'
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

        <Style.Logo>
          <Link to='/'>
            <img
              alt='Carrefour logo'
              src={process.env.REACT_APP_LOGO}
            />
          </Link>
        </Style.Logo>
        
        <Input
          className='barra-busca not-mobile'
          placeholder='Pesquise por produtos ou marcas'
        />

        <div className='flex'>
          <Style.CEP>
            <p>Entregar no CEP</p>
            <span onClick={() => dispatch(removerCep())}>
              {appState.cep}
            </span>
          </Style.CEP>

          <Style.Carrinho onClick={() => dispatch(alternarCarrinho())}>
            <span>
              {carrinhoState.carrinho.length}
            </span>

            <i className='gg-shopping-cart' />
          </Style.Carrinho>
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
