import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const PRODUTO: Produto = Object.freeze<Produto>({
  id: '1',
  nome: 'Produto Teste',
  marca: 'Marca Teste',
  imagem: 'https://via.placeholder.com/150',
  categorias: [
    '/Categoria/Teste',
  ],
  preco: 9.99,
  descricao: 'Descrição Teste',
  quantidade: 2
})

export const PONTOS_DE_VENDA = [
  { id: 'ponto1', nome: 'ponto1' }
]

export const PRODUTOS = [
  PRODUTO,
  PRODUTO,
  PRODUTO
].map((produto, index) => ({ ...produto, id: `${index}` }))

const createMockServer = () => setupServer(
  rest.get<Ponto[]>(`${process.env.REACT_APP_API_URL}/pontos`, (req, res, ctx) => {
    return res(
      ctx.json(PONTOS_DE_VENDA)
    )
  }),

  rest.get<Produto[]>(`${process.env.REACT_APP_API_URL}/produtos`, (req, res, ctx) => {
    const ponto = req.url.searchParams.get('ponto')
    if (ponto !== PONTOS_DE_VENDA[0].id) {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Ponto de venda não encontrado'
        })
      )
    }

    return res(
      ctx.json(PRODUTOS)
    )
  })
)

export default createMockServer
