import React from 'react'
import { Provider } from 'react-redux'
import appReducer from './slices/app'
import carrinhoReducer from './slices/carrinho'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    app: appReducer,
    carrinho: carrinhoReducer
  }
})

type ProviderProps = {
  children: React.ReactNode
}

export const StoreProvider = ({ children }: ProviderProps) => (
  <Provider store={store}>
    {children}
  </Provider>
)

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
