import Produto from '.'
import React from 'react'
import * as Style from './styles'
import { PRODUTO } from '../../../../test/server'
import { render, screen, fireEvent, createMockStore } from '../../../../test/render'

describe('<Produtos.Produto />', () => {
  test('renderiza o produto fora do carrinho', () => {
    const { container } = render(<Produto produto={PRODUTO} />)
    
    const imagemElement = container.querySelector(`${Style.Imagem} img`)
    expect(imagemElement).toBeInTheDocument()
    expect(imagemElement).toHaveAttribute('src', PRODUTO.imagem)
    expect(imagemElement).toHaveAttribute('alt', PRODUTO.nome)

    const nomeElement = screen.getByText(PRODUTO.nome)
    expect(nomeElement).toBeInTheDocument()

    const precoElement = screen.getByText('R$ 9,99')
    expect(precoElement).toBeInTheDocument()

    const botaoAdicionarElement = screen.getByText('Adicionar')
    expect(botaoAdicionarElement).toBeInTheDocument()
  })

  test('adiciona o produto no carrinho', async () => {
    const store = createMockStore()
    render(<Produto produto={PRODUTO} />, { store })
    
    const botaoAdicionarElement = screen.getByText('Adicionar')
    expect(botaoAdicionarElement).toBeInTheDocument()

    await fireEvent.click(botaoAdicionarElement)
    expect(store.getState().carrinho.carrinho.length).toEqual(1)
  })

  test('renderiza componente de quantidade', async () => {
    const store = createMockStore({
      carrinhoState: {
        carrinho: [ PRODUTO ],
        carrinhoAberto: false
      }
    })

    render(<Produto produto={PRODUTO} />, { store })
    
    const avisoAdicionadoElement = screen.getByText('Produto adicionado')
    expect(avisoAdicionadoElement).toBeInTheDocument()

    const adicionarBtnElement = screen.getByText('+')
    expect(adicionarBtnElement).toBeInTheDocument()

    const removerBtnElement = screen.getByText('-')
    expect(removerBtnElement).toBeInTheDocument()

    const quantidade = PRODUTO.quantidade || 0
    const quantidadeElement = screen.getByText(quantidade.toString())
    expect(quantidadeElement).toBeInTheDocument()
  })
})