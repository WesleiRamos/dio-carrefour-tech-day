import Produtos from '.'
import React from 'react'
import ProdutosWrapper from './styles'
import { render } from '../../../test/render'
import { PRODUTOS } from '../../../test/server'

describe('<Inicio.Produtos />', () => {
  test('renderiza a lista de produtos da pagina inicial', () => {
    const { container } = render(<Produtos produtos={PRODUTOS} />)
    
    const produtosElement = container.querySelector(`${ProdutosWrapper}`)
    expect(produtosElement).toBeInTheDocument()
    expect(produtosElement?.children).toHaveLength(3)
  })
})