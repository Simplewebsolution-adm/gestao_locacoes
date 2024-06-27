import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteService from '../../services/clienteService'; 

const ClienteList = () => {
  const [clientesList, setClientesList] = useState([]);

  const clientes = clienteService.getListaClientes(); 

  const handleDelete = (id) => {
    clienteService.deletarCliente(id);
    setClientesList(clientesList.filter(cliente => cliente.id !== id));
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <div className="custom-button-container">
        <p>
          <Link to="/clientes/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Cliente">
            <i className="fas fa-plus"></i>
          </Link>
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <Link to={`/clientes/${cliente.id}/editar`} className="btn btn-warning btn-sm btn-spacing" title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/clientes/details/${cliente.id}`} className="btn btn-primary btn-sm btn-spacing" title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button onClick={() => handleDelete(cliente.id)} className="btn btn-danger btn-sm" title="Excluir">
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

export default ClienteList;
