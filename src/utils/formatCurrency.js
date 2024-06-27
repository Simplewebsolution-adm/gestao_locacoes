export const formatCurrency = (value) => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'));
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
