import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatData';
import reservaService from '../../services/reservaService';
import clienteService from '../../services/clienteService';
import imovelService from '../../services/imovelService';
import styles from './css/ReservaDetails.module.css'; 

const ReservaDetails = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [imovel, setImovel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reservaData = await reservaService.getReservaById(id);
      setReserva(reservaData);

      const clienteData = await clienteService.getClienteById(reservaData.clienteId);
      setCliente(clienteData);

      const imovelData = await imovelService.getImovelById(reservaData.imovelId);
      setImovel(imovelData);
    };

    fetchData();
  }, [id]);

  if (!reserva) {
    return <div>Carregando detalhes da reserva...</div>;
  }

  return (
    <div className={styles.reservaDetails}>
      <h4>Detalhes da Reserva</h4>
      <hr />
      <dl className="row">
        <dt className={styles.colSm2}>Cliente</dt>
        <dd className={styles.colSm10}>{cliente?.nome}</dd>
        <dt className={styles.colSm2}>Imóvel</dt>
        <dd className={styles.colSm10}>{imovel?.descricao}</dd>
        <dt className={styles.colSm2}>Data da Reserva</dt>
        <dd className={styles.colSm10}>{formatDate(reserva.dataReserva)}</dd>
        <dt className={styles.colSm2}>Data de Entrada</dt>
        <dd className={styles.colSm10}>{formatDate(reserva.dataEntrada)}</dd>
        <dt className={styles.colSm2}>Data de Saída</dt>
        <dd className={styles.colSm10}>{formatDate(reserva.dataSaida)}</dd>
        <dt className={styles.colSm2}>Origem</dt>
        <dd className={styles.colSm10}>{reserva.origem}</dd>
        <dt className={styles.colSm2}>Forma de Pagamento</dt>
        <dd className={styles.colSm10}>{reserva.formaPagamento}</dd>
        <dt className={styles.colSm2}>Valor da Reserva</dt>
        <dd className={styles.colSm10}>{formatCurrency(reserva.valorReserva)}</dd>
        <dt className={styles.colSm2}>Valor Comissão</dt>
        <dd className={styles.colSm10}>{formatCurrency(reserva.valorComissao)}</dd>
        <dt className={styles.colSm2}>Taxa Limpeza</dt>
        <dd className={styles.colSm10}>{formatCurrency(reserva.taxaLimpeza)}</dd>
        <dt className={styles.colSm2}>Situação</dt>
        <dd className={styles.colSm10}>{reserva.situacao}</dd>
        <dt className={styles.colSm2}>Observações</dt>
        <dd className={styles.colSm10}>{reserva.observacoes}</dd>
      </dl>
      <div>
        <Link to={`/reservas/${reserva.id}/editar`} className={`btn btn-warning btn-md ${styles.btnSpacing}`} title="Alterar">
            <i className="fas fa-edit"></i>
        </Link>
        
        <Link to="/reservas" className="btn btn-primary btn-md" title="Voltar">
            <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default ReservaDetails;
