import Item from './Item'
import Button from '../Button'
import CarrinhoWrapper from './styles'
import { AppDispatch } from '../../store'
import React, { useEffect, useRef } from 'react'
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
      <div ref={reference} className='content'>
        <div className='cabecalho'>
          <div onClick={() => dispatch(alternarCarrinho())}>
            <i className='gg-close' />
          </div>
  
          <h2>Carrinho ({ carrinhoState.carrinho.length })</h2>  
        </div>

        <div className='itens'>
          {carrinhoState.carrinho.map(produto => (
            <Item
              key={produto.id}
              produto={produto}
            />
          ))}
        </div>

        <div className='subtotal'>
          <div>
            <span>
              Subtotal ({ carrinhoState.carrinho.length } produto{ carrinhoState.carrinho.length >= 2 && 's' })
            </span>

            <span className='preco'>
              { subtotal }
            </span>
          </div>

          <Button className='btn'>
            Finalizar Compra
          </Button>
        </div>
      </div>
    </CarrinhoWrapper>
  )
}

export default Carrinho

