import Item from './Item'
import Button from '../Button'
import { AppDispatch } from '../../store'
import React, { useEffect, useRef } from 'react'
import CarrinhoWrapper, * as Style from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectCarrinhoState, alternarCarrinho } from '../../store/slices'

const Carrinho = () => {
  const dispatch = useDispatch<AppDispatch>()
  const reference = useRef<HTMLDivElement>(null)
  const carrinhoState = useSelector(selectCarrinhoState)

  /**
   * Volta ao topo da página e habilita/desabilita o scroll da página
   * dependendo do status de abertura do carrinho
   */
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = carrinhoState.carrinhoAberto
      ? 'hidden'
      : 'auto'

  }, [ carrinhoState.carrinhoAberto ])

  if (!carrinhoState.carrinhoAberto)
    return <></>

  // Valor total a ser pago
  const subtotal = carrinhoState.carrinho
    .reduce((acc, { preco, quantidade = 0}) =>
      acc + (preco * quantidade)
    , 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  /**
   * Função responsável por fechar o carrinho caso haja um click
   * fora dele
   * @param event
   */
  const onClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (reference.current && reference.current.contains(event.target as Node))
      return

    dispatch(alternarCarrinho())
  }

  return (
    <CarrinhoWrapper onClick={onClickOutside}>
      <Style.Conteudo ref={reference}>
        <Style.Cabecalho>
          <div onClick={() => dispatch(alternarCarrinho())}>
            <i className='gg-close' />
          </div>
  
          <h2>Carrinho ({ carrinhoState.carrinho.length })</h2>  
        </Style.Cabecalho>

        <Style.Itens>
          {carrinhoState.carrinho.map(produto => (
            <Item
              key={produto.id}
              produto={produto}
            />
          ))}
        </Style.Itens>

        <Style.Subtotal>
          <div>
            <span>
              Subtotal ({ carrinhoState.carrinho.length } produto{ carrinhoState.carrinho.length >= 2 && 's' })
            </span>

            <span>
              { subtotal }
            </span>
          </div>

          <Button className='btn'>
            Finalizar Compra
          </Button>
        </Style.Subtotal>
      </Style.Conteudo>
    </CarrinhoWrapper>
  )
}

export default Carrinho

