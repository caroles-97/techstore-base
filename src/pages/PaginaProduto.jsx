import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { produtoDisponivelParaVenda, produtoTemPrecoValido } from '../utils/carrinho'

export default function PaginaProduto({ produtos, onAdicionar, onNotificar }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemEspera, setMensagemEspera] = useState('')

  const produto = produtos.find((item) => item.id === id)

  if (!produto || !produtoTemPrecoValido(produto)) {
    return (
      <div className="estado-vazio">
        <p>Produto indisponível no momento.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = produto.estoque === 0

  function handleNotificar(evento) {
    evento.preventDefault()

    if (!nome.trim() || !email.trim() || !onNotificar) {
      return
    }

    onNotificar(produto.id, { nome: nome.trim(), email: email.trim() })
    setNome('')
    setEmail('')
    setMensagemEspera('Você entrou na lista de espera para esse produto.')
  }

  const relacionados = produtos
    .filter(
      (item) =>
        produtoDisponivelParaVenda(item) && item.category === produto.category && item.id !== produto.id
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {produto.price.toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {esgotado ? (
            <form onSubmit={handleNotificar} className="cupom">
              <label className="rotulo">Produto esgotado</label>
              <input
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Seu nome"
              />
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Seu e-mail"
              />
              <button type="submit" className="botao botao-grande">
                Avise-me quando voltar
              </button>
              {mensagemEspera && <p className="mensagem-cupom">{mensagemEspera}</p>}
            </form>
          ) : (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={produto.estoque === 0}
            >
              Adicionar ao carrinho
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <article key={item.id} className="card">
            <Link to={`/produto/${item.id}`} className="card-link">
              <div className="card-imagem-moldura">
                <img src={item.image} alt={item.title} className="card-imagem" />
              </div>
              <h3 className="card-titulo">{item.title}</h3>
            </Link>
            <p className="preco">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
            <button className="botao" onClick={() => onAdicionar(item)}>
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
