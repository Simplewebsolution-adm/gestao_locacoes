import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency';
import { formatDate } from './../../utils/formatData';
import vendaService from './../../services/vendaService';
import clienteService from './../../services/clienteService';
import produtoService from './../../services/produtoService';

const VendaList = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const vendasData = vendaService.getListaVendas();
      const clientesData = await clienteService.getListaClientes();
      const produtosData = await produtoService.getListaProdutos();

      const vendasComNomes = vendasData.map(venda => {
        const cliente = clientesData.find(cliente => cliente.id === venda.clienteId)?.nome || '';
        const produto = produtosData.find(produto => produto.id === venda.produtoId)?.descricao || '';
        return { ...venda, cliente, produto };
      });

      setVendas(vendasComNomes);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    vendaService.deletarVenda(id);
    setVendas(vendas.filter(venda => venda.id !== id));
  };

  return (
    <div>
      <h2>Lista de Vendas</h2>
      <div className="custom-button-container">
        <p>
          <Link to="/vendas/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Venda">
            <i className="fas fa-plus"></i>
          </Link>
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Data da Venda</th>
            <th>Forma de Pagamento</th>
            <th>Quantidade</th>
            <th>Valor da Venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => (
            <tr key={venda.id}>
              <td>{venda.cliente}</td>
              <td>{venda.produto}</td>
              <td>{formatDate(venda.dataVenda)}</td>
              <td>{venda.formaPagamento}</td>
              <td>{venda.quantidade}</td>
              <td>{formatCurrency(venda.valorVenda)}</td>
              <td>
                <Link to={`/vendas/${venda.id}/editar`} className="btn btn-warning btn-sm btn-spacing" title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/vendas/details/${venda.id}`} className="btn btn-primary btn-sm btn-spacing" title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button onClick={() => handleDelete(venda.id)} className="btn btn-danger btn-sm" title="Excluir">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendaList;
