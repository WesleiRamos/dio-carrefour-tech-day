import Quantity from '.'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Quantity />', () => {
  test('renderiza componente de quantidade', async () => {
    const handleChange = jest.fn()
    render(<Quantity value={1} onChange={handleChange} />)

    const removerBotao = screen.getByText('-')
    expect(removerBotao).toBeInTheDocument()

    const adicionarBotao = screen.getByText('+')
    expect(adicionarBotao).toBeInTheDocument()

    await fireEvent.click(removerBotao)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenLastCalledWith(0)

    await fireEvent.click(adicionarBotao)
    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenLastCalledWith(2)
  })  
})