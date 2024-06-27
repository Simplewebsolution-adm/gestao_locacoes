import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency';
import vendaService from './../../services/vendaService';
import clienteService from './../../services/clienteService';
import imovelService from './../../services/imovelService';
import styles from './css/VendaForm.module.css'; // Importe o módulo CSS

const VendaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venda, setVenda] = useState({
    clienteId: '',
    imovelId: '',
    dataVenda: new Date().toISOString().split('T')[0],
    formaPagamento: 'DINHEIRO',
    quantidade: 1,
    valorVenda: 0,
  });
  const [clientes, setClientes] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [valorVendaFormatado, setValorVendaFormatado] = useState('R$ 0,00');

  useEffect(() => {
    const fetchData = async () => {
      const clientesData = await clienteService.getListaClientes();
      const imoveisData = await imovelService.getListaImoveis();

      setClientes(clientesData);
      setImoveis(imoveisData);

      if (id) {
        const vendaId = parseInt(id);
        const vendaEncontrada = await vendaService.getVendaById(vendaId);
        if (vendaEncontrada) {
          const clienteId = vendaEncontrada.clienteId;
          const imovelId = vendaEncontrada.imovelId;
          setVenda({
            ...vendaEncontrada,
          });
          setValorUnitario(parseFloat(imoveisData.find(p => p.id === imovelId).valor.replace(",", ".")));
          setValorVendaFormatado(formatCurrency(vendaEncontrada.valorVenda));
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'imovelId') {
      const novoValorUnitario = parseFloat(imoveis.find(p => p.id === parseInt(value)).valor.replace(",", "."));
      setValorUnitario(novoValorUnitario);
      const novoValorVenda = novoValorUnitario * venda.quantidade;
      setVenda({
        ...venda,
        [name]: value,
        valorVenda: novoValorVenda,
      });
      setValorVendaFormatado(formatCurrency(novoValorVenda));
    } else if (name === 'quantidade') {
      const novaQuantidade = parseInt(value);
      const novoValorVenda = valorUnitario * novaQuantidade;
      setVenda({
        ...venda,
        [name]: novaQuantidade,
        valorVenda: novoValorVenda,
      });
      setValorVendaFormatado(formatCurrency(novoValorVenda));
    } else {
      setVenda({
        ...venda,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      vendaService.atualizarVenda(parseInt(id), venda);
    } else {
      vendaService.adicionarVenda(venda);
    }
    navigate('/vendas');
  };

  return (
    <div className={styles.vendaForm}>
      <h4>{id ? 'Alterar Venda' : 'Nova Venda'}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Cliente</label>
              <div className={styles.colSm9}>
                <select
                  name="clienteId"
                  value={venda.clienteId}
                  onChange={handleChange}
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
                  value={venda.imovelId}
                  onChange={handleChange}
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
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Data da Venda</label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataVenda"
                  value={venda.dataVenda}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Forma de Pagamento</label>
              <div className={styles.colSm9}>
                <select
                  name="formaPagamento"
                  value={venda.formaPagamento}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="DINHEIRO">DINHEIRO</option>
                  <option value="PIX">PIX</option>
                  <option value="CRÉDITO">CRÉDITO</option>
                  <option value="DÉBITO">DÉBITO</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Quantidade</label>
              <div className={styles.colSm9}>
                <input
                  type="number"
                  name="quantidade"
                  value={venda.quantidade}
                  onChange={handleChange}
                  className="form-control"
                  min="1"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label className={`${styles.colSm3} col-form-label ${styles.textRight}`}>Valor da Venda</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorVenda"
                  value={valorVendaFormatado}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <div className="col-sm-9 offset-sm-3">
                <button type="submit" className="btn btn-primary float-end">Salvar</button>
                <Link to="/vendas" className={`btn btn-primary btn-md float-end ${styles.btnSpacing}`} title="Voltar">
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

export default VendaForm;
