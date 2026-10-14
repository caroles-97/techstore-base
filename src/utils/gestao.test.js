import test from 'node:test'
import assert from 'node:assert/strict'

import {
    clientesEsperandoPorCategoria,
    produtosSemPreco,
    valorEmEstoquePorCategoria,
} from './gestao.js'

test('valorEmEstoquePorCategoria soma o valor total do estoque por categoria', () => {
    const produtos = [
        { id: '1', category: 'roupas', price: 50, estoque: 2 },
        { id: '2', category: 'roupas', price: 80, estoque: 1 },
        { id: '3', category: 'eletronicos', price: 200, estoque: 2 },
    ]

    assert.deepEqual(valorEmEstoquePorCategoria(produtos), {
        roupas: 180,
        eletronicos: 400,
        acessorios: 0,
        casa: 0,
    })
})

test('produtosSemPreco retorna itens sem valor definido', () => {
    const produtos = [
        { id: '1', category: 'roupas', price: 50, estoque: 2 },
        { id: '2', category: 'eletronicos', price: undefined, estoque: 1 },
        { id: '3', category: 'casa', price: null, estoque: 4 },
    ]

    assert.equal(produtosSemPreco(produtos).length, 2)
})

test('clientesEsperandoPorCategoria conta a fila por categoria', () => {
    const produtos = [
        { id: 'p1', category: 'roupas', estoque: 0 },
        { id: 'p2', category: 'roupas', estoque: 3 },
        { id: 'p3', category: 'eletronicos', estoque: 0 },
    ]

    const listaEspera = [
        { produtoId: 'p1', nome: 'Ana', email: 'ana@email.com' },
        { produtoId: 'p1', nome: 'Bia', email: 'bia@email.com' },
        { produtoId: 'p3', nome: 'Caio', email: 'caio@email.com' },
    ]

    assert.deepEqual(clientesEsperandoPorCategoria(produtos, listaEspera), {
        roupas: 2,
        eletronicos: 1,
        acessorios: 0,
        casa: 0,
    })
})
