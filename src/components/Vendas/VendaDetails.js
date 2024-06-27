import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency';
import { formatDate } from './../../utils/formatData';
import vendaService from './../../services/vendaService';
import clienteService from './../../services/clienteService';
import produtoService from './../../services/produtoService';
import styles from './css/VendaDetails.module.css'; 

const VendaDetails = () => {
  const { id } = useParams();
  const [venda, setVenda] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const vendaData = await vendaService.getVendaById(id);
      setVenda(vendaData);

      const clienteData = await clienteService.getClienteById(vendaData.clienteId);
      setCliente(clienteData);

      const produtoData = await produtoService.getProdutoById(vendaData.produtoId);
      setProduto(produtoData);
    };

    fetchData();
  }, [id]);

  if (!venda) {
    return <div>Carregando detalhes da venda...</div>;
  }

  return (
    <div className={styles.vendaDetails}>
      <h4>Detalhes da Venda</h4>
      <hr />
      <dl className="row">
        <dt className={styles.colSm2}>Cliente</dt>
        <dd className={styles.colSm10}>{cliente?.nome}</dd>
        <dt className={styles.colSm2}>Produto</dt>
        <dd className={styles.colSm10}>{produto?.descricao}</dd>
        <dt className={styles.colSm2}>Data da Venda</dt>
        <dd className={styles.colSm10}>{formatDate(venda.dataVenda)}</dd>
        <dt className={styles.colSm2}>Forma de Pagamento</dt>
        <dd className={styles.colSm10}>{venda.formaPagamento}</dd>
        <dt className={styles.colSm2}>Quantidade</dt>
        <dd className={styles.colSm10}>{venda.quantidade}</dd>
        <dt className={styles.colSm2}>Valor da Venda</dt>
        <dd className={styles.colSm10}>{formatCurrency(venda.valorVenda)}</dd>
      </dl>
      <div>
        <Link to={`/vendas/${venda.id}/editar`} className={`btn btn-warning btn-md ${styles.btnSpacing}`} title="Alterar">
            <i className="fas fa-edit"></i>
        </Link>
        
        <Link to="/vendas" className="btn btn-primary btn-md" title="Voltar">
            <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default VendaDetails;
