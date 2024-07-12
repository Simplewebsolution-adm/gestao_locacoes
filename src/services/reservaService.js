let reservas = [
    { id: 1, 
      clienteId: 1, 
      imovelId: 1, 
      dataReserva: '2023-01-01', 
      dataEntrada: '2024-01-11', 
      dataSaida: '2024-01-21', 
      modalidade: 'APLICATIVO',
      origem: 'BOOKING',    
      formaPagamento: 'BOOKING', 
      valorReserva: 1200.00, 
      valorComissao: 100.00,
      taxaLimpeza: 0,
      situacao: 'CONFIRMADA',
      observacoes: 'TESTE 123'
    },
    { id: 2, 
      clienteId: 2, 
      imovelId: 2, 
      dataReserva: '2023-02-01', 
      dataEntrada: '2024-02-01', 
      dataSaida: '2024-02-11', 
      modalidade: 'PARTICULAR',
      origem: 'FACEBOOK',
      formaPagamento: 'PIX', 
      valorReserva: 1450.00,
      valorComissao: 0.00,
      taxaLimpeza: 100.00,
      situacao: 'PENDENTE',
      observacoes: 'TESTE 123'
    },
    { id: 3, 
      clienteId: 3, 
      imovelId: 4, 
      dataReserva: '2023-02-01', 
      dataEntrada: '2024-12-28', 
      dataSaida: '2025-01-03', 
      modalidade: 'PARTICULAR',
      origem: 'INDICAÇÃO',
      formaPagamento: 'CARTAO', 
      valorReserva: 7450.00,
      valorComissao: 100.00,
      taxaLimpeza: 120.00,
      situacao: 'CANCELADA',
      observacoes: 'TESTE 123'
    },
  ];
  
  const getListaReservas = () => {
    return reservas;
  };
  
  const getReservaById = (id) => {
    const reserva = reservas.find(reserva => reserva.id === parseInt(id));
    return reserva;
  };
  
  const adicionarReserva = (reserva) => {
    reserva.id = reservas.length + 1;
    reservas.push(reserva);
  };
  
  const atualizarReserva = (id, reservaAtualizada) => {
    reservas = reservas.map(reserva => (reserva.id === id ? { ...reservaAtualizada, id } : reserva));
  };
  
  const deletarReserva = (id) => {
    reservas = reservas.filter(reserva => reserva.id !== id);
  };
  
  export default {
    getListaReservas,
    getReservaById,
    adicionarReserva,
    atualizarReserva,
    deletarReserva,
  };
