import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imovelService from '../../services/imovelService'; 

const ImovelList = () => {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    setImoveis(imovelService.getListaImoveis());
  }, []);

  const handleDelete = (id) => {
    imovelService.deletarImovel(id);
    setImoveis(imoveis.filter(imovel => imovel.id !== id));
  };

  return (
    <div>
      <h2>Lista de Imoveis</h2>
      <p>
        <Link to="/imoveis/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Imoveis">
          <i className="fas fa-plus"></i>
        </Link>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Endereco</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {imoveis.map(imovel => (
            <tr key={imovel.id}>
              <td>{imovel.descricao}</td>
              <td>{imovel.endereco}</td>
              <td>
                <Link to={`/imoveis/${imovel.id}/editar`} className="btn btn-warning btn-sm btn-spacing" title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/imoveis/details/${imovel.id}`} className="btn btn-primary btn-sm btn-spacing" title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button className="btn btn-danger btn-sm" title="Excluir" onClick={() => handleDelete(imovel.id)}>
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

export default ImovelList;
