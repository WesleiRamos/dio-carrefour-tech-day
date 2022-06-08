import Item from '.'
import React from 'react'
import { PRODUTO } from '../../../test/server'
import { render, screen, fireEvent, createMockStore } from '../../../test/render'

describe('<Item />', () => {
  test('renderiza um item do carrinho', () => {
    const { container } = render(<Item produto={PRODUTO} />)

    const imagemElement = container.querySelector('.imagem img')
    expect(imagemElement).toHaveAttribute('src', PRODUTO.imagem)
    expect(imagemElement).toHaveAttribute('alt', PRODUTO.nome)

    const nomeElement = screen.getByText(new RegExp(PRODUTO.nome, 'i'))
    expect(nomeElement).toBeInTheDocument()

    const precoElement = screen.getByText('R$ 9,99')
    expect(precoElement).toBeInTheDocument()

    const totalElement = screen.getByText('R$ 19,98')
    expect(totalElement).toBeInTheDocument()

    const quantidadeElement = container.querySelector('.quantidade')
    expect(quantidadeElement).toBeInTheDocument()
  })

  test('remove o item do carrinho', async () => {
    const store = createMockStore({
      carrinhoState: {
        carrinhoAberto: false,
        carrinho: [ { ...PRODUTO } ]
      }
    })

    const { container } = render(<Item produto={PRODUTO} />, { store})

    const removerElement = container.querySelector('.remover')
    await fireEvent.click(removerElement as Element)

    expect(store.getState().carrinho.carrinho).toHaveLength(0)
  })

  test('altera a quantidade e remove o item do carrinho', async () => {
    const store = createMockStore({
      carrinhoState: {
        carrinhoAberto: false,
        carrinho: [ { ...PRODUTO } ]
      }
    })

    const getProduto = () =>
      store.getState().carrinho.carrinho[0]

    const { rerender } = render(<Item produto={getProduto()} />, { store })
    
    const removerQuantidadeElement = screen.getByText('-')
    expect(removerQuantidadeElement).toBeInTheDocument()
    
    await fireEvent.click(removerQuantidadeElement)
    expect(getProduto().quantidade).toBe(1)

    rerender(<Item produto={getProduto()} />)

    await fireEvent.click(removerQuantidadeElement)
    expect(store.getState().carrinho.carrinho).toHaveLength(0)
  })
})