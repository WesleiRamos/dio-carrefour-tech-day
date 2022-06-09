import Button from '.'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('<Button />', () => {
  test('renderiza um botão', () => {
    render(<Button>Test</Button>)
    const botaoElement = screen.getByText('Test')
    expect(botaoElement).toBeInTheDocument()
  })   
})