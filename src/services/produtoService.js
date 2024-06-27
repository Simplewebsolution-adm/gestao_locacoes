let produtos = [
    { id: 1, descricao: 'CRIO', valor: '10,00' },
    { id: 2, descricao: 'CARBOX', valor: '20,00' },
    { id: 3, descricao: 'LIMPEZA PELE', valor: '30,00' },
  ];
  
  const getListaProdutos = () => {
    return produtos;
  };
  
  const getProdutoById = (id) => {
    return produtos.find(produto => produto.id === id);
  };
  
  const adicionarProduto = (produto) => {
    produto.id = produtos.length + 1;
    produtos.push(produto);
  };
  
  const atualizarProduto = (id, produtoAtualizado) => {
    produtos = produtos.map(produto => (produto.id === id ? produtoAtualizado : produto));
  };
  
  const deletarProduto = (id) => {
    produtos = produtos.filter(produto => produto.id !== id);
  };
  
  export default {
    getListaProdutos,
    getProdutoById,
    adicionarProduto,
    atualizarProduto,
    deletarProduto,
  };
  