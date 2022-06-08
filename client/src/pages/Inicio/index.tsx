import CepModal from './CepModal'
import Produtos from './Produtos'
import InicioWrapper from './styles'
import { useSelector } from 'react-redux'
import { selectAppState } from '../../store/slices'

const Inicio = () => {
  const { produtos } = useSelector(selectAppState)

  /**
   * 
   */
  const renderProdutos = () => {
    if (produtos.length === 0)
      return <></>

    return (
      <>
        <div className='flex informacoes'>
          <span>
            <b>{produtos.length}</b> produtos encontrados
          </span>

          <div>
            <span>Ordenar por </span>
            <select>
              <option>Relevância</option>
            </select>
          </div>
        </div>

        <Produtos produtos={produtos} />
      </>
    )
  }

  return (
    <InicioWrapper>
      <CepModal />
      { renderProdutos() }
    </InicioWrapper>
  )
}

export default Inicio
