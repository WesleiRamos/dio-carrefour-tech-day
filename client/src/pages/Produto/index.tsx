import { AppDispatch } from '../../store'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Quantity from '../../components/Quantity'
import ProdutoWrapper, * as Style from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppState, selectCarrinhoState, alterarQuantidadeProduto } from '../../store/slices'

const Produto = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { produtos } = useSelector(selectAppState)
  const { carrinho } = useSelector(selectCarrinhoState)
  const produto = produtos.find(p => p.id === params.id)

  if (!produto) {
    return (
      <ProdutoWrapper>
        <Style.NaoEncontrado>
          Produto não encontrado
        </Style.NaoEncontrado>
      </ProdutoWrapper>
    )
  }

  const quantidade = carrinho.find(p => p.id === produto.id)?.quantidade || 0

  /**
   * Aplica a alteração de quantidade do produto
   * @param quantidade 
   */
  const alterarQuantidade = (quantidade: number) => {
    dispatch(alterarQuantidadeProduto({ ...produto, quantidade }))
  }


  /**
   * Renderiza o caminho das categorias
   */
  const renderCategorias = () => {
    return produto
      .categorias[0]
      .split('/')
      .filter(Boolean)
      .map((categoria, index) => (
        <span key={categoria + index}>{ categoria }</span>
      ))
  }

  /**
   * Renderiza a ação que pode ser executada dependendo do estado do carrinho
   */
  const renderizarAcao = () => {
    if (quantidade === 0) {
      return (
        <Button onClick={() => alterarQuantidade(1)}>
          <i className='gg-shopping-cart'/>
          <span>ADICIONAR AO CARRINHO</span>
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
      <Style.Categorias>
        <b>Você está em: </b> { renderCategorias() }
      </Style.Categorias>

      <Style.Produto>
        <Style.Imagem>
          <img src={ produto.imagem } alt={ produto.nome } />
        </Style.Imagem>

        <Style.Informacoes>
          <Style.Nome>
            { produto.nome }
          </Style.Nome>

          <Style.Marca>
            Marca: <b>{ produto.marca }</b>
          </Style.Marca>

          <Style.Preco className='flex'>
            <p>
              { produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
            </p>

            <Style.AdicionarCarrinho>
              { renderizarAcao() }
            </Style.AdicionarCarrinho>
          </Style.Preco>

          <Style.Condicoes className='flex'>
            <i className='gg-credit-card' />
            <span>Condições de pagamento</span>
          </Style.Condicoes>

          <Style.Descricao className='descricao'>
            {produto.descricao}
          </Style.Descricao>
        </Style.Informacoes>
      </Style.Produto>
    </ProdutoWrapper>
  )
}

export default Produto
