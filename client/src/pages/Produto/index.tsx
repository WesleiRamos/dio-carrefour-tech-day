import ProdutoWrapper from './styles'
import { AppDispatch } from '../../store'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Quantity from '../../components/Quantity'
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
        <p className='nao-encontrado'>
          Produto não encontrado
        </p>
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
        <Button className='flex' onClick={() => alterarQuantidade(1)}>
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
      <p className='categorias'>
        <b>Você está em: </b> { renderCategorias() }
      </p>

      <div className='produto'>
        <div className='imagem'>
          <img src={ produto.imagem } alt={ produto.nome } />
        </div>

        <div className='informacoes'>
          <p className='nome'>
            { produto.nome }
          </p>

          <p className='marca'>
            Marca: <b>{ produto.marca }</b>
          </p>

          <div className='flex preco'>
            <p className='preco'>
              { produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
            </p>

            <div className='add-carrinho'>
              { renderizarAcao() }
            </div>
          </div>

          <div className='flex condicoes'>
            <i className='gg-credit-card' />
            <span>Condições de pagamento</span>
          </div>

          <div className='descricao'>
            {produto.descricao}
          </div>
        </div>
      </div>
    </ProdutoWrapper>
  )
}

export default Produto
