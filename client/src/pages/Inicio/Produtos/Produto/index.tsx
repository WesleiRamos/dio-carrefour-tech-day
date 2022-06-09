import { Link } from 'react-router-dom'
import { AppDispatch } from '../../../../store'
import ProdutoWrapper, * as Style from './styles'
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
      <Style.Imagem>
        <img src={props.produto.imagem} alt={props.produto.nome} />
      </Style.Imagem>

      <Link className='nome' to={`/produto/${props.produto.id}`}>
        {props.produto.nome}
      </Link>

      <Style.Preco>
        {props.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Style.Preco>

      <Style.Acao>
        {renderizarAcao()}
      </Style.Acao>
    </ProdutoWrapper>
  )
}

export default Produto
