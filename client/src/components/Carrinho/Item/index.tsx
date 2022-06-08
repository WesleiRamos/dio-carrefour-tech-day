import ItemWrapper from './styles'
import Quantity from '../../Quantity'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { removerDoCarrinho, alterarQuantidadeProduto } from '../../../store/slices'

type ItemProps = {
  produto: Produto
}

const Item = (props: ItemProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const preco = props.produto.preco
  const quantidade = props.produto.quantidade || 0
  const total = preco * quantidade

  return (
    <ItemWrapper>
      <div className='imagem'>
        <img src={props.produto.imagem} alt={props.produto.nome} />
      </div>
      
      <div className='informacoes'>
        <div className='flex'>
          <p className='nome'>
            {props.produto.nome}
          </p>

          <div className='remover' onClick={() => dispatch(removerDoCarrinho(props.produto))}>
            <i className='gg-trash-empty'/>
          </div>
        </div>

        <div className='flex'>
          <p className='preco'>
            {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>

          <Quantity
            className='quantidade'
            value={props.produto.quantidade || 0}
            onChange={quantidade => dispatch(alterarQuantidadeProduto({ ...props.produto, quantidade }))}
          />

          <p className='total'>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </ItemWrapper>
  )
}

export default Item

