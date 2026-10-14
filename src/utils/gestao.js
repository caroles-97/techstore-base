import { produtoTemPrecoValido } from './carrinho.js'

export const CATEGORIAS_LOJISTA = ['roupas', 'eletronicos', 'acessorios', 'casa']

export function valorEmEstoquePorCategoria(produtos) {
    return CATEGORIAS_LOJISTA.reduce((acumulador, categoria) => {
        const total = produtos
            .filter((produto) => produto.category === categoria)
            .filter(produtoTemPrecoValido)
            .reduce((soma, produto) => soma + Number(produto.price) * Number(produto.estoque || 0), 0)

        acumulador[categoria] = total
        return acumulador
    }, {})
}

export function produtosSemPreco(produtos) {
    return produtos.filter((produto) => !produtoTemPrecoValido(produto))
}

export function clientesEsperandoPorCategoria(produtos, listaEspera = []) {
    return CATEGORIAS_LOJISTA.reduce((acumulador, categoria) => {
        const produtosCategoria = produtos.filter((produto) => produto.category === categoria)
        const total = listaEspera.filter((item) => {
            const produto = produtosCategoria.find((produtoAtual) => produtoAtual.id === item.produtoId)
            return Boolean(produto) && Number(produto.estoque || 0) === 0
        }).length

        acumulador[categoria] = total
        return acumulador
    }, {})
}

export function lucroEstimadoPorCategoria(produtos) {
    return CATEGORIAS_LOJISTA.reduce((acumulador, categoria) => {
        const total = produtos
            .filter((produto) => produto.category === categoria)
            .filter(produtoTemPrecoValido)
            .reduce((soma, produto) => soma + Number(produto.price) * Number(produto.estoque || 0), 0)

        acumulador[categoria] = total
        return acumulador
    }, {})
}
