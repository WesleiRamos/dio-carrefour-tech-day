import { RootState } from '../../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const CARRINHO_DEFAULT_STATE: CarrinhoState = {
  carrinhoAberto: false,
  carrinho: [ ]
}

/**
 * Remove um produto da lista informada
 * @param produto Produto a ser removido
 * @param produtos Lista de produtos
 */
const filtrarProdutos = (produto: Produto, produtos: Produto[]): Produto[] =>
  produtos.filter(({ id }) => id !== produto.id)


const criarCarrinhoSlice = (initialState: CarrinhoState = CARRINHO_DEFAULT_STATE) => createSlice({
  initialState,
  name: 'carrinho',
  reducers: {
    /**
     * Alterna o estado do carrinho entre aberto e fechado
     * @param state 
     * @param action 
     */
    alternarCarrinho: (state: CarrinhoState) => {
      state.carrinhoAberto = !state.carrinhoAberto
    },
    
    /**
     * @param state 
     * @param param1 
     */
    removerDoCarrinho: (state: CarrinhoState, { payload: produto }: PayloadAction<Produto>) => {
      state.carrinho = filtrarProdutos(produto, state.carrinho)
    },

    /**
     * Adiciona um produto ao carrinho caso ele não exista
     * @param state 
     * @param param1 
     * @returns 
     */
    adicionarAoCarrinho: (state: CarrinhoState, { payload: produto }: PayloadAction<Produto>) => {
      if (state.carrinho.some(p => p.id === produto.id))
        return

      state.carrinho = produto.quantidade === 0
        ? filtrarProdutos(produto, state.carrinho)
        : [ ...state.carrinho, produto ]
    },

    /**
     * Altera a quantidade de um produto, caso a quantidade seja 0, o produto é removido da lista
     * @param state 
     * @param param1 
     * @returns 
     */
    alterarQuantidadeProduto: (state: CarrinhoState, { payload: produto }: PayloadAction<Produto>) => {
      if (produto.quantidade === 0) {
        state.carrinho = filtrarProdutos(produto, state.carrinho)
        return
      }
      
      const find = state.carrinho.find(prod => prod.id === produto.id)
      if (find) {
        find.quantidade = produto.quantidade
      } else {
        state.carrinho.push({ ...produto, quantidade: 1 })
      }
    }
  }
})

const carrinhoSlice = criarCarrinhoSlice()
export const selectCarrinhoState = (state: RootState) =>
  state.carrinho

export default carrinhoSlice.reducer
export const {
  adicionarAoCarrinho,
  alterarQuantidadeProduto,
  alternarCarrinho,
  removerDoCarrinho
} = carrinhoSlice.actions
