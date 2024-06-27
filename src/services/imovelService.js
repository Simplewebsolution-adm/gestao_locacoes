let imoveis = [
    { id: 1, descricao: '1501 - SUN WAY', endereco: 'OSWALDO CRUZ, 3235. IPIRANGUINHA - UBATUBA' },
    { id: 2, descricao: '1210 - SUN WAY', endereco: 'OSWALDO CRUZ, 3235. IPIRANGUINHA - UBATUBA' },
    { id: 3, descricao: '71 - COSTA VERDE', endereco: 'SÃO BENEDITO, 237. CAIÇARA - PRAIA GRANDE' },
    { id: 3, descricao: '406 - PAINEIRAS', endereco: 'PAULINO BORRELI, 43. MIRIM - PRAIA GRANDE' },
  ];
  
  const getListaImoveis = () => {
    return imoveis;
  };
  
  const getImovelById = (id) => {
    return imoveis.find(imovel => imovel.id === id);
  };
  
  const adicionarImovel = (imovel) => {
    imovel.id = imoveis.length + 1;
    imoveis.push(imovel);
  };
  
  const atualizarImovel = (id, imovelAtualizado) => {
    imoveis = imoveis.map(imovel => (imovel.id === id ? imovelAtualizado : imovel));
  };
  
  const deletarImovel = (id) => {
    imoveis = imoveis.filter(imovel => imovel.id !== id);
  };
  
  export default {
    getListaImoveis,
    getImovelById,
    adicionarImovel,
    atualizarImovel,
    deletarImovel,
  };
  