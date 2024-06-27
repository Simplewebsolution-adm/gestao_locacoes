import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency'; 
import produtoService from '../../services/produtoService'; 

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    setProdutos(produtoService.getListaProdutos());
  }, []);

  const handleDelete = (id) => {
    produtoService.deletarProduto(id);
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <p>
        <Link to="/produtos/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Produto">
          <i className="fas fa-plus"></i>
        </Link>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.descricao}</td>
              <td>{formatCurrency(produto.valor)}</td>
              <td>
                <Link to={`/produtos/${produto.id}/editar`} className="btn btn-warning btn-sm btn-spacing" title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/produtos/details/${produto.id}`} className="btn btn-primary btn-sm btn-spacing" title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button className="btn btn-danger btn-sm" title="Excluir" onClick={() => handleDelete(produto.id)}>
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

export default ProdutoList;
