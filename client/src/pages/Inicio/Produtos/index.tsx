import Produto from './Produto'
import ProdutosWrapper from './styles'

type ProdutosProps = {
  produtos: Produto[]
}

const Produtos = (props: ProdutosProps) => {
  return (
    <ProdutosWrapper>
      <div className='produtos'>
        {props.produtos.map(produto => (
          <Produto produto={produto} key={produto.id} />
        ))}
      </div>
    </ProdutosWrapper>
  )
}

export default Produtos
