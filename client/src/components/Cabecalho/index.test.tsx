import React from 'react'
import Cabecalho from '.'
import { APP_DEFAULT_STATE } from '../../store/slices'
import { render, screen, fireEvent, createMockStore } from '../../test/render'

describe('<Cabecalho />', () => {
  test('renderiza o cabeçalho', async () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        cep: '12345000'
      }
    })

    const { container } = render(<Cabecalho />, { store })

    const logoElement = container.querySelector('.logo img')
    expect(logoElement).toBeInTheDocument()

    const caixaBuscaElement = container.querySelector('.barra-busca')
    expect(caixaBuscaElement).toBeInTheDocument()

    const cepLabelElement = screen.getByText(/Entregar no CEP/i)
    expect(cepLabelElement).toBeInTheDocument()

    const cepValueElement = screen.getByText(/12345000/i)
    expect(cepValueElement).toBeInTheDocument()

    const carrinhoElement = container.querySelector('.carrinho')
    expect(carrinhoElement).toBeInTheDocument()

    await fireEvent.click(carrinhoElement as Element)
    expect(store.getState().carrinho.carrinhoAberto).toBe(true)
  })  
})