import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency'; 
import { formatDate } from './../../utils/formatData';
import compraService from './../../services/compraService';

const CompraList = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    setCompras(compraService.getListaCompras());
  }, []);

  const handleDelete = (id) => {
    compraService.deletarCompra(id);
    setCompras(compras.filter(compra => compra.id !== id));
  };

  return (
    <div>
      <h2>Lista de Compras</h2>
      <div className="custom-button-container">
        <p>
          <Link to="/compras/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Compra">
            <i className="fas fa-plus"></i>
          </Link>
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Fornecedor</th>
            <th>Produto</th>
            <th>Data da Compra</th>
            <th>Forma de Pagamento</th>
            <th>Valor Unitário</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {compras.map(compra => (
            <tr key={compra.id}>
              <td>{compra.fornecedor}</td>
              <td>{compra.produto}</td>
              <td>{formatDate(compra.dataCompra)}</td>
              <td>{compra.formaPagamento}</td>
              <td>{formatCurrency(compra.valorUnitario)}</td>
              <td>{compra.quantidade}</td>
              <td>{formatCurrency(compra.valorCompra)}</td>
              <td>
                <Link to={`/compras/${compra.id}/editar`} className="btn btn-warning btn-sm btn-spacing" title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/compras/details/${compra.id}`} className="btn btn-primary btn-sm btn-spacing" title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button onClick={() => handleDelete(compra.id)} className="btn btn-danger btn-sm" title="Excluir">
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

export default CompraList;
