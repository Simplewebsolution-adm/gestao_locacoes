import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatData';
import reservaService from '../../services/reservaService';
import clienteService from '../../services/clienteService';
import imovelService from '../../services/imovelService';
import styles from './css/ReservaList.module.css';  // Import the CSS module

const ReservaList = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reservasData = await reservaService.getListaReservas(); 
      const clientesData = await clienteService.getListaClientes();
      const imoveisData = await imovelService.getListaImoveis();

      const reservasComNomes = reservasData.map(reserva => {
        const cliente = clientesData.find(cliente => cliente.id === reserva.clienteId)?.nome || '';
        const imovel = imoveisData.find(imovel => imovel.id === reserva.imovelId)?.descricao || '';
        return { ...reserva, cliente, imovel };
      });

      setReservas(reservasComNomes);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await reservaService.deletarReserva(id);  // Added await
    setReservas(reservas.filter(reserva => reserva.id !== id));
  };

  return (
    <div>
      <h2>Lista de Reservas</h2>
      <div className="custom-button-container">
        <p>
          <Link to="/reservas/novo" className="btn btn-primary btn-sm rounded-circle custom-button" title="Inserir Reserva">
            <i className="fas fa-plus"></i>
          </Link>
        </p>
      </div>
      <table className={`table ${styles.table}`}>  {/* Add styles.table if necessary */}
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Imóvel</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Origem</th>
            <th>Valor</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id}>
              <td>{reserva.cliente}</td>
              <td>{reserva.imovel}</td>
              <td>{formatDate(reserva.dataEntrada)}</td>
              <td>{formatDate(reserva.dataSaida)}</td>
              <td>{reserva.origem}</td>
              <td>{formatCurrency(reserva.valorReserva)}</td>
              <td>{reserva.situacao}</td>
              <td className={styles['action-buttons']}>  {/* Use the CSS module */}
                <Link to={`/reservas/${reserva.id}/editar`} className={`btn btn-warning btn-sm ${styles['btn-spacing']}`} title="Alterar">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link to={`/reservas/details/${reserva.id}`} className={`btn btn-primary btn-sm ${styles['btn-spacing']}`} title="Detalhes">
                  <i className="fas fa-eye"></i>
                </Link>
                <button onClick={() => handleDelete(reserva.id)} className="btn btn-danger btn-sm" title="Excluir">
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

export default ReservaList;
