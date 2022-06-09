import Produto from './Produto'
import ProdutosWrapper from './styles'

type ProdutosProps = {
  produtos: Produto[]
}

const Produtos = (props: ProdutosProps) => {
  return (
    <ProdutosWrapper>
      {props.produtos.map(produto => (
        <Produto produto={produto} key={produto.id} />
      ))}
    </ProdutosWrapper>
  )
}

export default Produtos
