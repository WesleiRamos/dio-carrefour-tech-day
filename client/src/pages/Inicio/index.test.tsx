import Inicio from '.'
import React from 'react'
import { APP_DEFAULT_STATE } from '../../store/slices'
import { PRODUTOS, PONTOS_DE_VENDA } from '../../test/server'
import { render, screen, createMockStore } from '../../test/render'

describe('<Inicio />', () => {
  test('renderiza a rota inicial sem cep', () => {
    render(<Inicio />)

    const modalTituloElement = screen.getByText('Receber em casa')
    expect(modalTituloElement).toBeInTheDocument()
  })

  test('renderiza a rota inicial sem cep', () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        cep: '01001000',
        pontos: [ ...PONTOS_DE_VENDA ],
        produtos: [ ...PRODUTOS ]
      }
    })

    const { container } = render(<Inicio />, { store })

    const modalTituloElement = screen.queryByText('Receber em casa')
    expect(modalTituloElement).not.toBeInTheDocument()

    const resultadoElement = screen.getByText('produtos encontrados')
    expect(resultadoElement).toBeInTheDocument()

    const ordenarPorElement = screen.getByText('Ordenar por')
    expect(ordenarPorElement).toBeInTheDocument()

    const produtosElement = container.querySelector('.produtos')
    expect(produtosElement).toBeInTheDocument()
    expect(produtosElement?.children).toHaveLength(3)
  })
})