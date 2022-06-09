import { useState, useEffect } from 'react'
import { AppDispatch } from '../../../store'
import Input from '../../../components/Input'
import CepModalWrapper, * as Style from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppState, getPontos, getProdutos } from '../../../store/slices'

const CepModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [ cepState, setCepState ] = useState<string>('')
  const { cep, carregando, pontos, erro } = useSelector(selectAppState)

  /**
   * Carrega os produtos depois que o cep é informado
   */
   useEffect(() => {
    if (cep === '')
      return

    if (pontos.length === 0) {
      dispatch(getPontos(cep))
      return
    }

    dispatch(getProdutos(pontos[0].id))
  }, [ cep, pontos, dispatch ])

  if (cep !== '') 
    return <></>

  /**
   * Retorna o status da busca
   * @returns 
   */
  const renderInformacao = (): React.ReactNode => {
    if (carregando) {
      return (
        <p>Buscando...</p>
      )
    }

    if (erro !== '') {
      return (
        <>
          <p>Que pena! 😔</p>
          <p>Ainda não conseguimos entregar neste CEP, tente outro.</p>
        </>
      )
    }

    return <></>
  }

  return (
    <CepModalWrapper className='modal'>
      <Style.Content className='content'>
        <h3>Receber em casa</h3>
        <p>Digite seu CEP para visualizar ofertas para sua região</p>

        <Input
          text='Buscar'
          placeholder='00000-000'
          onClick={() => dispatch(getPontos(cepState))}
          onChange={e => setCepState(e.target.value.trim())}
        />

        <Style.Aviso>
          {renderInformacao()}
        </Style.Aviso>
      </Style.Content>
    </CepModalWrapper>
  )
}

export default CepModal
