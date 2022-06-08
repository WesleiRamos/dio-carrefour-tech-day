const request = async <T>(path: string, params = {}): Promise<T> => {
  const parametros = new URLSearchParams(params)
  const resposta = await fetch(`${process.env.REACT_APP_API_URL}/${path}?${parametros}`)
  return await resposta.json()
}

export default request