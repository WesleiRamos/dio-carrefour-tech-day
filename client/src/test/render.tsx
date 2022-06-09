import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render as testRender } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import appReducer, { APP_DEFAULT_STATE } from '../store/slices/app'
import carrinhoReducer, { CARRINHO_DEFAULT_STATE } from '../store/slices/carrinho'

type DefaultRoute = {
  /**
   * Rota
   */
  path: string,

  /**
   * Fake "link" para o MemoryRouter
   */
  entry: string[]
}

type RenderOptions = {
  store?: any,
  appState?: AppState,
  route?: DefaultRoute,
  carrinhoState?: CarrinhoState,
}

type UI = React.ReactElement<any, string | React.JSXElementConstructor<any>>

const DEFAULT_ROUTE: DefaultRoute = {
  path: '/',
  entry: [ '/' ]
}

/**
 * Cria uma store especifica para teste, caso não seja passado nenhum estado
 * cria com o estado padrão
 */
export const createMockStore = ({ appState = APP_DEFAULT_STATE, carrinhoState = CARRINHO_DEFAULT_STATE } = {}) => {
  const store = configureStore({
    reducer: {
      app: appReducer,
      carrinho: carrinhoReducer,
    },
    preloadedState: {
      app: appState,
      carrinho: carrinhoState,
    },
  })
  return store
}

/**
 * Renderiza um componente dentro de um Provider com uma store e dentro de uma rota
 */
const render = (ui: UI, { appState, carrinhoState, route = DEFAULT_ROUTE, store = createMockStore({ appState, carrinhoState }) }: RenderOptions = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={route.entry}>
        <Routes>
          <Route path={route.path} element={children} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  return testRender(ui, { wrapper: Wrapper })
}

export * from '@testing-library/react'
export { render }