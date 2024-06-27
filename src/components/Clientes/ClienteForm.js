import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from './../../services/clienteService';
import InputMask from 'react-input-mask';
import styles from './css/ClienteForm.module.css'; // Importando o CSS Module

const ClienteForm = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    telefone: '',
    dataNasc: '',
    email: ''
  });

  useEffect(() => {
    const clienteId = parseInt(id);
    const clienteEncontrado = clienteService.getClienteById(clienteId);

    if (clienteEncontrado !== null && clienteEncontrado !== undefined)
      setCliente(clienteEncontrado);
  }, [id]);

  if (id && !cliente) {
    return <p>Carregando...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'email' ? value.toLowerCase() : value.toUpperCase();
    setCliente({ ...cliente, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar os dados do cliente
  };

  return (
    <div className={styles.clienteForm}>
      <h4>{id ? 'Alterar Cliente' : 'Novo Cliente'}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="nome" className={`col-sm-3 col-form-label ${styles.textRight}`}>Nome</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className={`form-control ${styles.input}`}
                  id="nome" 
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="cpf" className={`col-sm-3 col-form-label ${styles.textRight}`}>CPF</label>
              <div className="col-sm-9">
                <InputMask
                  mask="999.999.999-99"
                  className={`form-control ${styles.input}`}
                  id="cpf"
                  name="cpf"
                  value={cliente.cpf}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="endereco" className={`col-sm-3 col-form-label ${styles.textRight}`}>Endereço</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className={`form-control ${styles.input}`}
                  id="endereco"
                  name="endereco"
                  value={cliente.endereco}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="telefone" className={`col-sm-3 col-form-label ${styles.textRight}`}>Telefone</label>
              <div className="col-sm-9">
                <InputMask
                  mask="(99) 99999-9999"
                  className={`form-control ${styles.input}`}
                  id="telefone"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="dataNasc" className={`col-sm-3 col-form-label ${styles.textRight}`}>Data de Nascimento</label>
              <div className="col-sm-9">
                <InputMask
                  mask="99/99/9999"
                  className={`form-control ${styles.input}`}
                  id="dataNasc"
                  name="dataNasc"
                  value={cliente.dataNasc}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label htmlFor="email" className={`col-sm-3 col-form-label ${styles.textRight}`}>Email</label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className={`form-control ${styles.input}`}
                  id="email"
                  name="email"
                  value={cliente.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <div className={`${styles.colSm9} offset-sm-3`}>
                <button type="submit" className={`btn btn-primary ${styles.floatEnd}`}>Salvar</button>
                <Link to="/clientes" className={`btn btn-primary btn-md ${styles.floatEnd} ${styles.btnSpacing}`} title="Voltar">
                  <i className="fas fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClienteForm;
