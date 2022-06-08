type Ponto = {
  id: string,
  nome: string,
}

type Produto = {
  id: string,
  nome: string,
  marca: string,
  imagem: string,
  categorias: string[],
  descricao: string,
  preco: number,
  quantidade?: number
}

type AppState = {
  carregando: boolean,
  erro: string,
  cep: string,
  pontos: Ponto[],
  produtos: Produto[]
}

type CarrinhoState = {
  carrinhoAberto: boolean,
  carrinho: Produto[],
}