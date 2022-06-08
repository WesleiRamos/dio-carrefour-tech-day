import ProdutoWrapper from './styles'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../../../store'
import Button from '../../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Quantity from '../../../../components/Quantity'
import { selectCarrinhoState, alterarQuantidadeProduto } from '../../../../store/slices'

type ProdutoProps = {
  produto: Produto
}

const Produto = (props: ProdutoProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { carrinho } = useSelector(selectCarrinhoState)
  const quantidade = carrinho.find(produto => produto.id === props.produto.id)?.quantidade || 0

  /**
   * Aplica a alteração de quantidade do produto
   * @param quantidade 
   */
  const alterarQuantidade = (quantidade: number) => {
    dispatch(alterarQuantidadeProduto({ ...props.produto, quantidade }))
  }

  /**
   * Renderiza a ação que pode ser executada dependendo do estado do carrinho
   */
  const renderizarAcao = () => {
    if (quantidade === 0) {
      return (
        <Button onClick={() => alterarQuantidade(1)}>
          Adicionar
        </Button>
      )
    }

    return (
      <>
        <Quantity value={quantidade} onChange={alterarQuantidade} />
        <p>Produto adicionado</p>
      </>
    )
  }

  return (
    <ProdutoWrapper>
      <div className='imagem'>
        <img src={props.produto.imagem} alt={props.produto.nome} />
      </div>

      <Link className='nome' to={`/produto/${props.produto.id}`}>
        {props.produto.nome}
      </Link>

      <p className='preco'>
        {props.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>

      <div className='acao'>
        {renderizarAcao()}
      </div>
    </ProdutoWrapper>
  )
}

export default Produto
