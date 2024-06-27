import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency } from './../../utils/formatCurrency'; 
import produtoService from './../../services/produtoService'; 
import styles from './css/ProdutoDetails.module.css'; // Importe o módulo CSS

const ProdutoDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    // Usando o produtoService para obter os dados do produto
    const produtoId = parseInt(id);
    const produtoEncontrado = produtoService.getProdutoById(produtoId);
    setProduto(produtoEncontrado);
  }, [id]);

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.produtoDetails}>
      <h4>Detalhes do Produto</h4>
      <hr />
      <dl className={styles.row}>
        <dt className={styles.colSm2}>Descrição</dt>
        <dd className={styles.colSm10}>{produto.descricao}</dd>
        
        <dt className={styles.colSm2}>Valor</dt>
        <dd className={styles.colSm10}>{formatCurrency(produto.valor)}</dd>
      </dl>
      <div>
        <Link to={`/produtos/${produto.id}/editar`} className={`btn btn-warning btn-md ${styles.btnSpacing}`} title="Alterar">
            <i className="fas fa-edit"></i>
        </Link>
        
        <Link to="/produtos" className="btn btn-primary btn-md" title="Voltar">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProdutoDetails;
