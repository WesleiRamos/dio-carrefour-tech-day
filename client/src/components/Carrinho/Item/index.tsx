import Quantity from '../../Quantity'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import ItemWrapper, * as Style from './styles'
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
      <Style.Imagem>
        <img src={props.produto.imagem} alt={props.produto.nome} />
      </Style.Imagem>
      
      <Style.Informacoes>
        <div className='flex'>
          <p>{props.produto.nome}</p>

          <Style.Remover onClick={() => dispatch(removerDoCarrinho(props.produto))}>
            <i className='gg-trash-empty'/>
          </Style.Remover>
        </div>

        <div className='flex'>
          <p>
            {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>

          <Quantity
            className='quantidade'
            value={props.produto.quantidade || 0}
            onChange={quantidade => dispatch(alterarQuantidadeProduto({ ...props.produto, quantidade }))}
          />

          <Style.Total>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Style.Total>
        </div>
      </Style.Informacoes>
    </ItemWrapper>
  )
}

export default Item

