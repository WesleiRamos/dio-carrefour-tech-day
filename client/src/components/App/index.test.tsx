import App from '.'
import React from 'react'
import { render } from '@testing-library/react'

describe('<App />', () => {
  test('renderiza a aplicação', () => {
    const { container } = render(<App />)
    const cabecalhoElement = container.querySelector('header')
    const containerElement = container.querySelector('div.container')
    expect(cabecalhoElement).toBeInTheDocument()
    expect(containerElement).toBeInTheDocument()
  })  
})