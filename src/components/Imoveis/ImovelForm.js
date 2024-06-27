import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import imovelService from '../../services/imovelService';
import styles from './css/ImovelForm.module.css'; 

const ImovelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imovel, setImovel] = useState({
    descricao: '',
    endereco: ''
  });

  useEffect(() => {
    if (id) {
      const imovelId = parseInt(id);
      const imovelEncontrado = imovelService.getImovelById(imovelId);
      setImovel(imovelEncontrado);
    } 
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'endereco') {
      setImovel({
        ...imovel,
        [name]: value.toUpperCase()
      });
    } else if (name === 'descricao') {
      setImovel({
        ...imovel,
        [name]: value.toUpperCase()
      });
    } else {
      setImovel({
        ...imovel,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      imovelService.updateImovel(imovel);
    } else {
      imovelService.createImovel(imovel);
    }
    navigate('/imoveis');
  };

  return (
    <div className={styles.imovelForm}>
      <h4>{id ? 'Alterar Imovel' : 'Novo Imovel'}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group row ${styles.linha}`}>
              <label className={`col-sm-3 col-form-label ${styles.textRight}`}>Descrição</label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="descricao"
                  value={imovel.descricao.toUpperCase()}
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
                  name="endereco"
                  value={imovel.endereco.toUpperCase()}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className={`form-group row ${styles.linha}`}>
              <div className={`${styles.colSm9} offset-sm-3`}>
                <button type="submit" className={`btn btn-primary ${styles.floatEnd}`}>Salvar</button>
                <Link to="/imoveis" className={`btn btn-primary btn-md ${styles.floatEnd} ${styles.btnSpacing}`} title="Voltar">
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

export default ImovelForm;
