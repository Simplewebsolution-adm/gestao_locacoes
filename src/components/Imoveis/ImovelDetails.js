import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import imovelService from '../../services/imovelService'; 
import styles from './css/ImovelDetails.module.css'; 

const ImovelDetails = () => {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);

  useEffect(() => {
    // Usando o imovelService para obter os dados do imovel
    const imovelId = parseInt(id);
    const imovelEncontrado = imovelService.getImovelById(imovelId);
    setImovel(imovelEncontrado);
  }, [id]);

  if (!imovel) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.imovelDetails}>
      <h4>Detalhes do Imóvel</h4>
      <hr />
      <dl className={styles.row}>
        <dt className={styles.colSm2}>Descrição</dt>
        <dd className={styles.colSm10}>{imovel.descricao}</dd>
        
        <dt className={styles.colSm2}>Endereço</dt>
        <dd className={styles.colSm10}>{imovel.endereco}</dd>
      </dl>
      <div>
        <Link to={`/imoveis/${imovel.id}/editar`} className={`btn btn-warning btn-md ${styles.btnSpacing}`} title="Alterar">
            <i className="fas fa-edit"></i>
        </Link>
        
        <Link to="/imoveis" className="btn btn-primary btn-md" title="Voltar">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default ImovelDetails;
