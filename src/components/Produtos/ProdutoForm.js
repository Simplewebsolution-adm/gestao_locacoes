import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import { formatCurrency } from './../../utils/formatCurrency'; 
import produtoService from './../../services/produtoService';
import styles from './css/ProdutoForm.module.css'; // Importe o módulo CSS

const ProdutoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    descricao: '',
    valor: 0
  });
  const [valorFormatado, setValorFormatado] = useState('R$ 0,00');

  useEffect(() => {
    if (id) {
      const produtoId = parseInt(id);
      const produtoEncontrado = produtoService.getProdutoById(produtoId);
      setProduto(produtoEncontrado);
      setValorFormatado(formatCurrency(produtoEncontrado.valor));
    } else {
      setValorFormatado(formatCurrency(0)); 
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'valor') {
      const valorNumerico = value.replace(/\D/g, '');
      const valorFormatado = formatCurrency(Number(valorNumerico) / 100);
      setProduto({
        ...produto,
        [name]: Number(valorNumerico) / 100
      });
      setValorFormatado(valorFormatado);
    } else if (name === 'descricao') {
      setProduto({
        ...produto,
        [name]: value.toUpperCase()
      });
    } else {
      setProduto({
        ...produto,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      produtoService.updateProduto(produto);
    } else {
      produtoService.createProduto(produto);
    }
    navigate('/produtos');
  };

  return (
    <div className={styles.produtoForm}>
      <h4>{id ? 'Alterar Produto' : 'Novo Produto'}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group row ${styles.linha}`}>
              <label className={`col-sm-3 col-form-label ${styles.textRight}`}>Descrição</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="descricao"
                  value={produto.descricao.toUpperCase()}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group row ${styles.linha}`}>
              <label className={`col-sm-3 col-form-label ${styles.textRight}`}>Valor</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valor"
                  value={valorFormatado}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group row ${styles.linha}`}>
              <div className={`${styles.colSm9} offset-sm-3`}>
                <button type="submit" className={`btn btn-primary ${styles.floatEnd}`}>Salvar</button>
                <Link to="/produtos" className={`btn btn-primary btn-md ${styles.floatEnd} ${styles.btnSpacing}`} title="Voltar">
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

export default ProdutoForm;
