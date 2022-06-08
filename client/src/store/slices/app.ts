import api from '../../services/api'
import { RootState } from '../../store'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

type Action<T> = PayloadAction<T> & {
  meta: { arg: any }
}

export const APP_DEFAULT_STATE: AppState = {
  cep: localStorage.getItem('cep') || '',
  erro: '',
  pontos: [],
  produtos: [],
  carregando: false
}

/**
 * Obtém uma lista de pontos de venda a partir do CEP informado
 */
export const getPontos = createAsyncThunk('app/getPontos', async (cep: string) => {
  return await api<Ponto[]>('pontos', { cep })
})

/**
 * Obtém uma lista de produtos com base no ponto de venda informado
 */
export const getProdutos = createAsyncThunk('app/getProdutos', async (ponto: string) => {
  return await api<Produto[]>('produtos', { ponto })
})

const criarAppSlice = (initialState: AppState = APP_DEFAULT_STATE) => createSlice({
  initialState,
  name: 'app',
  reducers: {
    removerCep: (state: AppState) => {
      state.cep = ''
    }
  },
  extraReducers: (builder) => {
    builder
      // Pontos de venda
      .addCase(getPontos.pending, (state: AppState) => {
        state.carregando = true
        state.cep = state.erro = ''
      })
      .addCase(getPontos.fulfilled, (state: AppState, action: Action<Ponto[] | { erro: string }>) => {
        state.carregando = false
        if (Array.isArray(action.payload)) {
          state.cep = action.meta.arg
          state.pontos = action.payload
          localStorage.setItem('cep', state.cep)
        } else {
          state.erro = action.payload.erro
        }
      })
      .addCase(getPontos.rejected, (state: AppState) => {
        state.carregando = false
        state.erro = 'Não foi possível encontrar o ponto de entrega'
      })

      // Produtos
      .addCase(getProdutos.pending, (state: AppState) => {
        state.erro = ''
        state.carregando = true
      })
      .addCase(getProdutos.fulfilled, (state: AppState, { payload }: PayloadAction<Produto[]>) => {
        state.carregando = false
        state.produtos = payload
      })
      .addCase(getProdutos.rejected, (state: AppState) => {
        state.carregando = false
        state.erro = 'Não foi possível encontrar os produtos'
      })
  }
})

const appSlice = criarAppSlice()
export default appSlice.reducer
export const { removerCep } = appSlice.actions
export const selectAppState = (state: RootState) =>
  state.app
