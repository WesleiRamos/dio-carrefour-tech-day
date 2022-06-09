import Input from '.'
import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'

describe('<Input />', () => {
  test('renderiza input com texto', async () => {
    const onClick = jest.fn()
    const onChange = jest.fn()
    const { container } = render((
      <Input
        text='Test'
        placeholder='Insira algo'
        onChange={onChange}
        onClick={onClick}
      />
    ))

    const botaoElement = screen.getByText('Test')
    expect(botaoElement).toBeInTheDocument()

    const inputElement = container.querySelector('input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', 'Insira algo')

    await fireEvent.change(inputElement as Element, { target: { value: 'novo valor' } })
    expect(onChange).toHaveBeenCalled()
    expect(inputElement).toHaveValue('novo valor')

    await fireEvent.click(botaoElement)
    expect(onClick).toHaveBeenCalled()
  })

  test('renderiza input com icone', async () => {
    const { container } = render(<Input />)
    const iconeElement = container.querySelector('.gg-search')
    expect(iconeElement).toBeInTheDocument()
  })  
})