import CepModal from '.'
import React from 'react'
import createMockServer from '../../../test/server'
import { APP_DEFAULT_STATE } from '../../../store/slices'
import { render, screen, fireEvent, createMockStore, waitFor } from '../../../test/render'

describe('<CepModal />', () => {
  const server = createMockServer()

  afterAll(() => server.close())
  beforeAll(() => server.listen())

  test('renderiza cep modal sem dados', () => {
    render(<CepModal />)

    const tituloElement = screen.getByText('Receber em casa')
    expect(tituloElement).toBeInTheDocument()

    const subtituloElement = screen.getByText('Digite seu CEP para visualizar ofertas para sua região')
    expect(subtituloElement).toBeInTheDocument()

    const inputElement = screen.getByPlaceholderText('00000-000')
    expect(inputElement).toBeInTheDocument()

    const btnElement = screen.getByText('Buscar')
    expect(btnElement).toBeInTheDocument()
  })

  test('renderiza cep modal com status buscando', () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        carregando: true
      }
    })

    render(<CepModal />, { store })
    const avisoElement = screen.getByText('Buscando...')
    expect(avisoElement).toBeInTheDocument()
  })

  test('renderiza cep modal com status de erro', () => {
    const store = createMockStore({
      appState: {
        ...APP_DEFAULT_STATE,
        erro: 'Erro ao buscar'
      }
    })

    render(<CepModal />, { store })
    const infoElement = screen.getByText('Que pena! 😔')
    expect(infoElement).toBeInTheDocument()

    const erroElement = screen.getByText('Ainda não conseguimos entregar neste CEP, tente outro.')
    expect(erroElement).toBeInTheDocument()
  })

  test('renderiza cep modal e insere cep', async () => {
    const store = createMockStore()
    const { container } = render(<CepModal />, { store })
    
    const inputElement = container.querySelector('input')
    expect(inputElement).toBeInTheDocument()

    await fireEvent.change(inputElement as Element, { target: { value: '01001-000' } })
    expect(inputElement).toHaveValue('01001-000')

    const btnElement = screen.getByText('Buscar')
    await fireEvent.click(btnElement)

    await waitFor(() => expect(store.getState().app.cep).toBe('01001-000'))
    await waitFor(() => expect(store.getState().app.pontos).toHaveLength(1))
    await waitFor(() => expect(store.getState().app.produtos).toHaveLength(3))
  })
})