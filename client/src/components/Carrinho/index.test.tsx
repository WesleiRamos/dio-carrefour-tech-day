import Carrinho from '.'
import React from 'react'
import * as Style from './styles'
import { PRODUTOS } from '../../test/server'
import { render, screen, fireEvent, createMockStore } from '../../test/render'

window.scrollTo = jest.fn()

const carrinhoState: CarrinhoState = {
  carrinhoAberto: true,
  carrinho: [ ...PRODUTOS ]
}

describe('<Carrinho />', () => {
  test('o carrinho deve estar escondido', () => {
    const { container } = render(<Carrinho />, {
      carrinhoState: {
        ...carrinhoState,
        carrinhoAberto: false
      }
    })

    expect(container).toBeEmptyDOMElement()
  })

  test('renderiza o carrinho de compras', async () => {
    const store = createMockStore({ carrinhoState })
    const { container } = render(<Carrinho />, { store })

    const tituloElement = screen.getByText('Carrinho (3)')
    expect(tituloElement).toBeInTheDocument()

    const itensElement = container.querySelector(`${Style.Itens}`)
    expect(itensElement).toBeInTheDocument()
    expect(itensElement?.children).toHaveLength(3)

    const subtotalCountElement = screen.getByText('Subtotal (3 produtos)')
    expect(subtotalCountElement).toBeInTheDocument()

    const subtotalElement = screen.getByText('R$ 59,94')
    expect(subtotalElement).toBeInTheDocument()

    const finalizarCompraBtnElement = container.querySelector(`${Style.Subtotal} .btn`)
    expect(finalizarCompraBtnElement).toBeInTheDocument()

    const fecharCarrinhoElement = container.querySelector(`${Style.Cabecalho} div`)
    expect(fecharCarrinhoElement).toBeInTheDocument()
    await fireEvent.click(fecharCarrinhoElement as HTMLElement)

    expect(store.getState().carrinho.carrinhoAberto).toBe(false)
  })  
})