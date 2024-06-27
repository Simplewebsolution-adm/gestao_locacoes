let clientes = [
  { id: 1, nome: 'EVERTON DENOIS', cpf: '222.299.468-38', dataNasc: '13/10/1982', email: 'cliente1@example.com', telefone: '(11) 1111-1111', endereco:'OTTO WERNER ROSEL, 811' },
  { id: 2, nome: 'ANA AMELIA BERNAL', cpf: '222.299.468-38', dataNasc: '13/10/1982', email: 'cliente2@example.com', telefone: '(22) 2222-2222', endereco:'OTTO WERNER ROSEL, 811' },
  { id: 3, nome: 'LUCIANA DA SILVA', cpf: '222.299.468-38', dataNasc: '13/10/1982', email: 'cliente3@example.com', telefone: '(33) 3333-3333' , endereco:'JOSE BENETTI, 41'},
];
  
const getListaClientes = () => {
  return clientes;
};

const getClienteById = (id) => {
  return clientes.find(cliente => cliente.id === id);
};

const adicionarCliente = (cliente) => {
  cliente.id = clientes.length + 1;
  clientes.push(cliente);
};

const atualizarCliente = (id, clienteAtualizado) => {
  clientes = clientes.map(cliente => (cliente.id === id ? clienteAtualizado : cliente));
};

const deletarCliente = (id) => {
  clientes = clientes.filter(cliente => cliente.id !== id);
};

export default {
  getListaClientes,
  getClienteById,
  adicionarCliente,
  atualizarCliente,
  deletarCliente,
};
  