import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import reservaService from '../../services/reservaService';
import clienteService from '../../services/clienteService';
import imovelService from '../../services/imovelService';
import styles from './css/ReservaForm.module.css'; // Importe o módulo CSS

const ReservaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({
    clienteId: '',
    imovelId: '',
    dataReserva: new Date().toISOString().split('T')[0],
    dataEntrada: new Date().toISOString().split('T')[0],
    dataSaida: new Date().toISOString().split('T')[0],
    modalidade: '',
    origem: '',
    formaPagamento: '', 
    valorReserva: 0,
    valorComissao: 0,
    valorPago: 0,
    situacao: ''
  });
  const [clientes, setClientes] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [valorReservaFormatado, setValorReservaFormatado] = useState('R$ 0,00');
  const [valorComissaoFormatado, setValorComissaoFormatado] = useState('R$ 0,00');
  const [valorPagoFormatado, setValorPagoFormatado] = useState('R$ 0,00');

  useEffect(() => {
    const fetchData = async () => {
      const clientesData = await clienteService.getListaClientes();
      const imoveisData = await imovelService.getListaImoveis();

      setClientes(clientesData);
      setImoveis(imoveisData);

      if (id) {
        const reservaId = parseInt(id);
        const reservaEncontrada = await reservaService.getReservaById(reservaId);
        if (reservaEncontrada) {
          setReserva({
            ...reservaEncontrada,
          });
          setValorReservaFormatado(formatCurrency(reservaEncontrada.valorReserva));
          setValorComissaoFormatado(formatCurrency(reservaEncontrada.valorComissao));
          setValorPagoFormatado(formatCurrency(reservaEncontrada.valorPago));
        }
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    const valorNumerico = value.replace(/\D/g, '');
    const valorFormatado = formatCurrency(Number(valorNumerico) / 100);
  
    if (name === 'valorReserva') {
      setReserva({ ...reserva, valorReserva: Number(valorNumerico) / 100 });
      setValorReservaFormatado(valorFormatado); // Atualiza o campo com o valor digitado pelo usuário
    } else if (name === 'valorComissao') {
      setReserva({ ...reserva, valorComissao: Number(valorNumerico) / 100 });
      setValorComissaoFormatado(valorFormatado); // Atualiza o campo com o valor digitado pelo usuário
    } else if (name === 'valorPago') {
      setReserva({ ...reserva, valorPago: Number(valorNumerico) / 100 });
      setValorPagoFormatado(valorFormatado); // Atualiza o campo com o valor digitado pelo usuário
    } else {
      setReserva({ ...reserva, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      reservaService.atualizarReserva(parseInt(id), reserva);
    } else {
      reservaService.adicionarReserva(reserva);
    }
    navigate('/reservas');
  };

  return (
    <div className={styles.reservaForm}>
      <h4>{id ? 'Alterar Reserva' : 'Nova Reserva'}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Cliente</label>
              <div className={styles.colSm9}>
                <select
                  name="clienteId"
                  value={reserva.clienteId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Imovel</label>
              <div className={styles.colSm9}>
                <select
                  name="imovelId"
                  value={reserva.imovelId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione um imovel</option>
                  {imoveis.map(imovel => (
                    <option key={imovel.id} value={imovel.id}>{imovel.descricao}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Data da Reserva</label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataReserva"
                  value={reserva.dataReserva}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Data da Entrada</label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataEntrada"
                  value={reserva.dataEntrada}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Data da Saída</label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataSaida"
                  value={reserva.dataSaida}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Modalidade</label>
              <div className={styles.colSm9}>
                <select
                  name="modalidade"
                  value={reserva.modalidade}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="APLICATIVO">APLICATIVO</option>
                  <option value="PARTICULAR">PARTICULAR</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Origem</label>
              <div className={styles.colSm9}>
                <select
                  name="origem"
                  value={reserva.origem}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="BOOKING">BOOKING</option>
                  <option value="AIRBNB">AIRBNB</option>
                  <option value="FACEBOOK">FACEBOOK</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Forma de Pagamento</label>
              <div className={styles.colSm9}>
                <select
                  name="formaPagamento"
                  value={reserva.formaPagamento}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="PIX">PIX</option>
                  <option value="CRÉDITO">CRÉDITO</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Valor da Reserva</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorReserva"
                  value={valorReservaFormatado}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Comissão</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorComissao"
                  value={valorComissaoFormatado}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Valor Pago</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorPago"
                  value={valorPagoFormatado}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Situação</label>
              <div className={styles.colSm9}>
                <select
                  name="situacao"
                  value={reserva.situacao}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="CONFIRMADA">CONFIRMADA</option>
                  <option value="CANCELADA">CANCELADA</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <div className="col-sm-9 offset-sm-3">
                <button type="submit" className="btn btn-primary float-end">Salvar</button>
                <Link to="/reservas" className={`btn btn-primary btn-md float-end ${styles.btnSpacing}`} title="Voltar">
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

export default ReservaForm;
