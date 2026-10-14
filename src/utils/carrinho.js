// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function produtoTemPrecoValido(produto) {
  if (!produto || typeof produto !== 'object') {
    return false
  }

  if (produto.price === null || produto.price === undefined || produto.price === '') {
    return false
  }

  const valor = Number(produto.price)
  return Number.isFinite(valor) && valor >= 0
}

export function produtoDisponivelParaVenda(produto) {
  return produtoTemPrecoValido(produto) && Number(produto.estoque) > 0
}

export function calcularTotal(carrinho) {
  return carrinho
    .filter(produtoTemPrecoValido)
    .reduce((total, produto) => total + Number(produto.price), 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho
    .filter(produtoTemPrecoValido)
    .forEach((produto) => {
      const existente = itens.find((item) => item.produto.id === produto.id)
      if (existente) {
        existente.quantidade += 1
      } else {
        itens.push({ produto, quantidade: 1 })
      }
    })
  return itens
}
