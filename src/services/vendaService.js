let vendas = [
    { id: 1, clienteId: 1, produtoId: 1, dataVenda: '2023-01-01', formaPagamento: 'DINHEIRO', quantidade: 2, valorVenda: 20.00 },
    { id: 2, clienteId: 2, produtoId: 2, dataVenda: '2023-02-01', formaPagamento: 'PIX', quantidade: 3, valorVenda: 45.00 },
  ];
  
  const getListaVendas = () => {
    return vendas;
  };
  
  const getVendaById = (id) => {
    const venda = vendas.find(venda => venda.id === parseInt(id));
    return venda;
  };
  
  const adicionarVenda = (venda) => {
    venda.id = vendas.length + 1;
    vendas.push(venda);
  };
  
  const atualizarVenda = (id, vendaAtualizada) => {
    vendas = vendas.map(venda => (venda.id === id ? { ...vendaAtualizada, id } : venda));
  };
  
  const deletarVenda = (id) => {
    vendas = vendas.filter(venda => venda.id !== id);
  };
  
  export default {
    getListaVendas,
    getVendaById,
    adicionarVenda,
    atualizarVenda,
    deletarVenda,
  };
