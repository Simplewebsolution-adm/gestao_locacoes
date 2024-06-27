import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from './../../services/clienteService';
import styles from './css/ClienteDetails.module.css'; // Importe o módulo CSS

const ClienteDetails = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const clienteId = parseInt(id);
    const clienteEncontrado = clienteService.getClienteById(clienteId);
    setCliente(clienteEncontrado);
  }, [id]);

  if (!cliente) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.clienteDetails}>
      <h4>Detalhes do Cliente</h4>
      <hr />
      <dl className={styles.row}>
        <dt className={styles.colSm3}>Nome</dt>
        <dd className={styles.colSm9}>{cliente.nome}</dd>
        
        <dt className={styles.colSm3}>CPF</dt>
        <dd className={styles.colSm9}>{cliente.cpf}</dd>
        
        <dt className={styles.colSm3}>Endereço</dt>
        <dd className={styles.colSm9}>{cliente.endereco}</dd>
        
        <dt className={styles.colSm3}>Telefone</dt>
        <dd className={styles.colSm9}>{cliente.telefone}</dd>
        
        <dt className={styles.colSm3}>Data de Nascimento</dt>
        <dd className={styles.colSm9}>{cliente.dataNasc}</dd>
        
        <dt className={styles.colSm3}>Email</dt>
        <dd className={styles.colSm9}>{cliente.email}</dd>
      </dl>
      <div>
        <Link to={`/clientes/${cliente.id}/editar`} className={`btn btn-warning btn-md ${styles.btnSpacing}`} title="Alterar">
            <i className="fas fa-edit"></i>
        </Link>
        
        <Link to="/clientes" className="btn btn-primary btn-md" title="Voltar">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default ClienteDetails;
