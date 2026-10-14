// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)
  const esperasPorProduto = listaEspera.reduce((acumulador, item) => {
    if (!acumulador[item.produtoId]) {
      acumulador[item.produtoId] = []
    }

    acumulador[item.produtoId].push(item)
    return acumulador
  }, {})

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>
      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {produtos
              .filter((produto) => esperasPorProduto[produto.id]?.length > 0)
              .flatMap((produto) =>
                esperasPorProduto[produto.id].map((espera, index) => (
                  <tr key={`${produto.id}-${espera.email}-${index}`}>
                    <td>{produto.title}</td>
                    <td>{espera.nome}</td>
                    <td>{espera.email}</td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
