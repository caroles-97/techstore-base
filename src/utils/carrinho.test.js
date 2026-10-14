import test from 'node:test'
import assert from 'node:assert/strict'

import { calcularTotal, produtoDisponivelParaVenda, produtoTemPrecoValido } from './carrinho.js'

test('calcularTotal soma corretamente os preços válidos do carrinho', () => {
    const carrinho = [
        { id: 'carregador-turbo', title: 'Carregador Turbo', price: 119.9 },
        { id: 'copo-termico', title: 'Copo Térmico', price: 49.9 },
    ]

    assert.equal(calcularTotal(carrinho), 169.8)
})

test('calcularTotal soma corretamente a segunda combinação real do cliente', () => {
    const carrinho = [
        { id: 'camiseta-esc', title: 'Camiseta Estampada', price: 79.9 },
        { id: 'tenis-casual', title: 'Tênis Casual', price: 149.9 },
    ]

    assert.equal(calcularTotal(carrinho), 229.8)
})

test('calcularTotal ignora itens sem preço definido', () => {
    const carrinho = [
        { id: 'a', price: 89.9 },
        { id: 'b', price: undefined },
        { id: 'c', price: 140.5 },
    ]

    assert.equal(calcularTotal(carrinho), 230.4)
})

test('produtoTemPrecoValido rejeita valores inexistentes', () => {
    assert.equal(produtoTemPrecoValido({ id: 'x', price: 39.9 }), true)
    assert.equal(produtoTemPrecoValido({ id: 'y', price: undefined }), false)
    assert.equal(produtoTemPrecoValido({ id: 'z' }), false)
})

test('produtoDisponivelParaVenda exige estoque positivo e preço válido', () => {
    assert.equal(produtoDisponivelParaVenda({ id: 'p1', price: 59.9, estoque: 3 }), true)
    assert.equal(produtoDisponivelParaVenda({ id: 'p2', price: 59.9, estoque: 0 }), false)
    assert.equal(produtoDisponivelParaVenda({ id: 'p3', price: undefined, estoque: 3 }), false)
})
