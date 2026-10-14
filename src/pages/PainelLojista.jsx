import { Link } from 'react-router'
import { produtoTemPrecoValido } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'
import {
    CATEGORIAS_LOJISTA,
    clientesEsperandoPorCategoria,
    lucroEstimadoPorCategoria,
    produtosSemPreco,
    valorEmEstoquePorCategoria,
} from '../utils/gestao'

export default function PainelLojista({ produtos = [], listaEspera = [] }) {
    const estoquePorCategoria = valorEmEstoquePorCategoria(produtos)
    const esperaPorCategoria = clientesEsperandoPorCategoria(produtos, listaEspera)
    const lucroPorCategoria = lucroEstimadoPorCategoria(produtos)
    const semPreco = produtosSemPreco(produtos)

    const totalEstoque = Object.values(estoquePorCategoria).reduce((soma, valor) => soma + valor, 0)
    const totalEspera = listaEspera.length
    const totalSemPreco = semPreco.length

    return (
        <section>
            <p className="sobretitulo">Painel do lojista</p>
            <h1>Gestão da loja</h1>

            <div className="painel-grid">
                <div className="painel-card painel-card-destaque">
                    <span className="painel-label">Estoque em valor</span>
                    <strong>{formatarPreco(totalEstoque)}</strong>
                    <small>Valor potencial se vender tudo hoje</small>
                </div>

                <div className="painel-card">
                    <span className="painel-label">Aguardando preço</span>
                    <strong>{totalSemPreco}</strong>
                    <small>Produtos sem preço definido</small>
                </div>

                <div className="painel-card">
                    <span className="painel-label">Clientes na fila de espera</span>
                    <strong>{totalEspera}</strong>
                    <small>Produtos esgotados aguardando retorno</small>
                </div>
            </div>

            <div className="tabela-moldura">
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Dinheiro em estoque</th>
                            <th>Lucro estimado</th>
                            <th>Esperando preço</th>
                            <th>Clientes esperando retorno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CATEGORIAS_LOJISTA.map((categoria) => (
                            <tr key={categoria}>
                                <td>{categoria}</td>
                                <td>{formatarPreco(estoquePorCategoria[categoria] || 0)}</td>
                                <td>{formatarPreco(lucroPorCategoria[categoria] || 0)}</td>
                                <td>
                                    {
                                        produtos.filter(
                                            (produto) => produto.category === categoria && !produtoTemPrecoValido(produto)
                                        ).length
                                    }
                                </td>
                                <td>{esperaPorCategoria[categoria] || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="painel-blocos">
                <div className="painel-bloco">
                    <h2>Produtos esperando preço</h2>
                    {semPreco.length === 0 ? (
                        <p className="aviso">Nenhum produto está parado esperando o preço do time de suprimentos.</p>
                    ) : (
                        <ul className="lista-simples">
                            {semPreco.map((produto) => (
                                <li key={produto.id}>
                                    {produto.title} — {produto.category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="painel-bloco">
                    <h2>Lista de espera</h2>
                    {listaEspera.length === 0 ? (
                        <p className="aviso">Nenhum cliente aguardando retorno de um produto esgotado.</p>
                    ) : (
                        <ul className="lista-simples">
                            {listaEspera.map((interesse, index) => {
                                const produto = produtos.find((item) => item.id === interesse.produtoId)

                                return (
                                    <li key={`${interesse.produtoId}-${interesse.email}-${index}`}>
                                        {produto?.title || 'Produto indisponível'} — {interesse.nome} ({interesse.email})
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>

            <div className="voltar-link">
                <Link to="/" className="botao botao-secundario">
                    Voltar para a loja
                </Link>
            </div>
        </section>
    )
}
