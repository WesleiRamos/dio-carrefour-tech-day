import React from 'react'
import Cabecalho from '.'
import * as Style from './styles'
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

    const logoElement = container.querySelector(`${Style.Logo} img`)
    expect(logoElement).toBeInTheDocument()

    const caixaBuscaElement = container.querySelector('.barra-busca')
    expect(caixaBuscaElement).toBeInTheDocument()

    const cepLabelElement = screen.getByText('Entregar no CEP')
    expect(cepLabelElement).toBeInTheDocument()

    const cepValueElement = screen.getByText('12345000')
    expect(cepValueElement).toBeInTheDocument()

    const carrinhoElement = container.querySelector(`${Style.Carrinho}`)
    expect(carrinhoElement).toBeInTheDocument()

    await fireEvent.click(carrinhoElement as Element)
    expect(store.getState().carrinho.carrinhoAberto).toBe(true)
  })  
})