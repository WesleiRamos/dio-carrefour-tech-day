import axios from 'axios'

const API = axios.create({
  baseURL: 'https://mercado.carrefour.com.br/api/'
})

/**
 * @param {string} caminho 
 * @param {(data: object) => object} transformar 
 * @returns {(params: object) => Promise<{ status: number, data: object }>}
 */
const request = (caminho, transformar) => async params => {
  try {
    const resposta = await API.get(caminho, { params })
    return {
      status: resposta.status,
      data: transformar(resposta.data)
    }
  } catch (error) {
    return {
      status: error.response.status,
      data: {
        erro: error.response.data.error.message
      }
    }
  }
}

const PONTOS_DE_VENDAS = request('/checkout/pub/regions', data => {
  return data
    .map(pontos => pontos.sellers)
    .flat()
    .map(ponto => ({
      id: ponto.id,
      nome: ponto.name
    }))
})

const PRODUTOS = request('/catalog_system/pub/products/search', data => {
  return data.map(produto => {
    return {
      id: produto.productId,
      nome: produto.productName,
      marca: produto.brand,
      imagem: produto.items[0].images[0].imageUrl,
      categorias: produto.categories,
      descricao: produto.description,
      preco: produto.items[0].sellers[0].commertialOffer.Price
    }
  })
})

const ROTAS = {
  PRODUTOS,
  PONTOS_DE_VENDAS
}

export default ROTAS
