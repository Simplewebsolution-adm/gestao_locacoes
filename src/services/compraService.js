let compras = [
    { id: 1, fornecedor: 'Fornecedor 1', produto: 'Produto 1', dataCompra: '2023-01-01', formaPagamento: 'DINHEIRO', valorUnitario: 10.00, quantidade: 2, valorCompra: 20.00 },
    { id: 2, fornecedor: 'Fornecedor 2', produto: 'Produto 2', dataCompra: '2023-02-01', formaPagamento: 'PIX', valorUnitario: 15.00, quantidade: 3, valorCompra: 45.00 },
  ];
  
  const getListaCompras = () => {
    return compras;
  };
  
  const getCompraById = (id) => {
    return compras.find(compra => compra.id === id);
  };
  
  const adicionarCompra = (compra) => {
    compra.id = compras.length + 1;
    compras.push(compra);
  };
  
  const atualizarCompra = (id, compraAtualizada) => {
    compras = compras.map(compra => (compra.id === id ? { ...compraAtualizada, id } : compra));
  };
  
  const deletarCompra = (id) => {
    compras = compras.filter(compra => compra.id !== id);
  };
  
  export default {
    getListaCompras,
    getCompraById,
    adicionarCompra,
    atualizarCompra,
    deletarCompra,
  };
  