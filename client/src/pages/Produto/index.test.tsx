import Produto from '.'
import React from 'react'
import { PRODUTOS } from '../../test/server'
import { APP_DEFAULT_STATE } from '../../store/slices'
import { render, screen, fireEvent, createMockStore } from '../../test/render'

describe('<Produto />', () => {
  const route = {
    path: '/:id',
    entry: [ '/0' ],
  }

  test('renderiza produto não encontrado', () => {
    render(<Produto />, {
      route
    })

    const produtoNaoEncontradoElement = screen.getByText('Produto não encontrado')
    expect(produtoNaoEncontradoElement).toBeInTheDocument()
  })

  test('produto deve ser encontrado e renderizado', () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        produtos: [ ...PRODUTOS ]
      }
    })

    render(<Produto />, { store, route })

    const produtoNaoEncontradoElement = screen.queryByText('Produto não encontrado')
    expect(produtoNaoEncontradoElement).not.toBeInTheDocument()

    const nomeProdutoElement = screen.getByText(PRODUTOS[0].nome)
    expect(nomeProdutoElement).toBeInTheDocument()

    const marcaProdutoElement = screen.getByText(PRODUTOS[0].marca)
    expect(marcaProdutoElement).toBeInTheDocument()

    const precoProdutoElement = screen.getByText('R$ 9,99')
    expect(precoProdutoElement).toBeInTheDocument()

    const condicoesElement = screen.getByText('Condições de pagamento')
    expect(condicoesElement).toBeInTheDocument()

    const descricaoElement = screen.getByText(PRODUTOS[0].descricao)
    expect(descricaoElement).toBeInTheDocument()
  })

  test('produto deve ser adicionado ao carrinho ao clicar em adicionar', async () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        produtos: [ ...PRODUTOS ]
      }
    })

    const { container } = render(<Produto />, { store, route })

    const adicionarBotao = container.querySelector('button')
    expect(adicionarBotao).toBeInTheDocument()

    await fireEvent.click(adicionarBotao as Element)
    expect(adicionarBotao).not.toBeInTheDocument()

    expect(store.getState().carrinho.carrinho).toHaveLength(1)
    expect(store.getState().carrinho.carrinho[0].id).toBe(PRODUTOS[0].id)

    const adicionarQuantidadeBotao = screen.getByText('+')
    expect(adicionarQuantidadeBotao).toBeInTheDocument()
    await fireEvent.click(adicionarQuantidadeBotao)
    
    expect(store.getState().carrinho.carrinho[0].quantidade).toBe(2)
    
    const removerQuantidadeBotao = screen.getByText('-')
    expect(removerQuantidadeBotao).toBeInTheDocument()
    
    await fireEvent.click(removerQuantidadeBotao)
    expect(store.getState().carrinho.carrinho[0].quantidade).toBe(1)
  })
})