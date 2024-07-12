import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import reservaService from "../../services/reservaService";
import clienteService from "../../services/clienteService";
import imovelService from "../../services/imovelService";
import styles from "./css/ReservaForm.module.css"; // Importe o módulo CSS

const ReservaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({
    clienteId: "",
    imovelId: "",
    dataReserva: new Date().toISOString().split("T")[0],
    dataEntrada: new Date().toISOString().split("T")[0],
    dataSaida: new Date().toISOString().split("T")[0],
    modalidade: "temporada", // Adicionado campo modalidade com valor padrão 'temporada'
    origem: "",
    formaPagamento: "",
    valorReserva: 0,
    valorComissao: 0,
    taxaLimpeza: 0,
    situacao: "",
    intermediarios: "", // Adicionado campo para intermediários
    tipoComissao: "R$", // Adicionado campo para tipo de comissão
    renovacaoAutomatica: "", // Adicionado campo para renovação automática
    observacoes: "", // Adicionado campo para observações
  });
  const [clientes, setClientes] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [valorReservaFormatado, setValorReservaFormatado] = useState("R$ 0,00");
  const [valorComissaoFormatado, setValorComissaoFormatado] =
    useState("R$ 0,00");
  const [taxaLimpezaFormatado, setTaxaLimpezaFormatado] = useState("R$ 0,00");
  const [opcoesOrigem, setOpcoesOrigem] = useState([
    { value: "", label: "Selecione a origem" },
    { value: "Particular", label: "Particular" },
    { value: "Airbnb", label: "Airbnb" },
    { value: "Booking", label: "Booking" },
    { value: "Decolar", label: "Decolar" },
    { value: "Outros", label: "Outros" },
  ]);
  const [opcoesFormaPagamento, setOpcoesFormaPagamento] = useState([
    { value: "", label: "Selecione a forma de pagamento" },
    { value: "App", label: "App" },
    { value: "Cartão de Crédito", label: "Cartão de Crédito" },
    { value: "PIX", label: "PIX" },
    { value: "Dinheiro", label: "Dinheiro" },
    { value: "Depósito Bancário", label: "Depósito Bancário" },
    { value: "Outros", label: "Outros" },
  ]);
  const [opcoesSituacao, setOpcoesSituacao] = useState([
    { value: "", label: "Selecione a situação" },
    { value: "Reservado", label: "Reservado" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Confirmar", label: "Confirmar" },
    { value: "Pagamento Pendente", label: "Pagamento Pendente" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const clientesData = await clienteService.getListaClientes();
      const imoveisData = await imovelService.getListaImoveis();

      setClientes(clientesData);
      setImoveis(imoveisData);

      if (id) {
        const reservaId = parseInt(id);
        const reservaEncontrada = await reservaService.getReservaById(
          reservaId
        );
        if (reservaEncontrada) {
          setReserva({
            ...reservaEncontrada,
          });
          setValorReservaFormatado(
            formatCurrency(reservaEncontrada.valorReserva)
          );
          setValorComissaoFormatado(
            formatCurrency(reservaEncontrada.valorComissao)
          );
          setTaxaLimpezaFormatado(
            formatCurrency(reservaEncontrada.taxaLimpeza)
          );
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Atualiza opções de origem conforme modalidade selecionada
    if (reserva.modalidade === "temporada") {
      setOpcoesOrigem([
        { value: "", label: "Selecione a origem" },
        { value: "Particular", label: "Particular" },
        { value: "Airbnb", label: "Airbnb" },
        { value: "Booking", label: "Booking" },
        { value: "Decolar", label: "Decolar" },
        { value: "Outros", label: "Outros" },
      ]);
      setOpcoesFormaPagamento([
        { value: "", label: "Selecione a forma de pagamento" },
        { value: "App", label: "App" },
        { value: "Cartão de Crédito", label: "Cartão de Crédito" },
        { value: "PIX", label: "PIX" },
        { value: "Dinheiro", label: "Dinheiro" },
        { value: "Depósito Bancário", label: "Depósito Bancário" },
        { value: "Outros", label: "Outros" },
      ]);
      setOpcoesSituacao([
        { value: "", label: "Selecione a situação" },
        { value: "Reservado", label: "Reservado" },
        { value: "Cancelado", label: "Cancelado" },
        { value: "Confirmar", label: "Confirmar" },
        { value: "Pagamento Pendente", label: "Pagamento Pendente" },
      ]);
    } else if (reserva.modalidade === "fixa") {
      setOpcoesOrigem([
        { value: "", label: "Selecione a origem" },
        { value: "Particular", label: "Particular" },
        { value: "Imobiliária", label: "Imobiliária" },
        { value: "Outros", label: "Outros" },
      ]);
      setOpcoesFormaPagamento([
        { value: "", label: "Selecione a forma de pagamento" },
        { value: "Boleto", label: "Boleto" },
        { value: "Cartão de Crédito", label: "Cartão de Crédito" },
        { value: "PIX", label: "PIX" },
        { value: "Dinheiro", label: "Dinheiro" },
        { value: "Depósito Bancário", label: "Depósito Bancário" },
        { value: "Outros", label: "Outros" },
      ]);
      setOpcoesSituacao([
        { value: "", label: "Selecione a situação" },
        { value: "Ativo", label: "Ativo" },
        { value: "Cancelado", label: "Cancelado" },
        { value: "Confirmar", label: "Confirmar" },
        { value: "Pagamento Pendente", label: "Pagamento Pendente" },
      ]);
    }
  }, [reserva.modalidade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Remover todos os caracteres não numéricos
    const valorNumerico = value.replace(/\D/g, "");
    // Converter para número e formatar
    const valorFormatado = formatCurrency(Number(valorNumerico) / 100);
  
    if (name === "valorReserva") {
      setReserva({ ...reserva, valorReserva: Number(valorNumerico) / 100 });
      setValorReservaFormatado(valorFormatado);
    } else if (name === "valorComissao") {
      const novoValorComissao = reserva.tipoComissao === "R$" ? Number(valorNumerico) / 100 : Number(value) / 100;
      setReserva({ ...reserva, valorComissao: novoValorComissao });
  
      if (reserva.tipoComissao === "%") {
        setValorComissaoFormatado(value); // Mostrar valor percentual sem formatação
      } else {
        setValorComissaoFormatado(valorFormatado); // Mostrar valor formatado
      }
    } else if (name === "taxaLimpeza") {
      setReserva({ ...reserva, taxaLimpeza: Number(valorNumerico) / 100 });
      setTaxaLimpezaFormatado(valorFormatado);
    } else {
      setReserva({ ...reserva, [name]: value });
    }
  };

  const handleModalidadeChange = (e) => {
    setReserva({ ...reserva, modalidade: e.target.value });
  };

const handleTipoComissaoChange = (e) => {
  const novoTipoComissao = e.target.value;

  let novoValorComissao = reserva.valorComissao;
  if (novoTipoComissao === '%') {
    novoValorComissao = 0; // Manter o valor como número para entrada percentual
  } else if (novoTipoComissao === 'R$') {
    novoValorComissao = reserva.tipoComissao === 'R$' ? reserva.valorComissao : 0;
  }

  setReserva({ ...reserva, tipoComissao: novoTipoComissao, valorComissao: novoValorComissao });

  if (novoTipoComissao === 'R$') {
    setValorComissaoFormatado(formatCurrency(novoValorComissao));
  } else {
    setValorComissaoFormatado(novoValorComissao.toString());
  }
};

const calcularValorFinal = () => {
  debugger
  const valorReserva = parseFloat(reserva.valorReserva);
  const valorComissao = parseFloat(reserva.valorComissao.toString().replace(',', '.'));

  if (isNaN(valorReserva) || isNaN(valorComissao)) {
    return 0;
  }

  if (reserva.tipoComissao === 'R$') {
    return valorReserva - valorComissao;
  } else {
    return valorReserva - (valorReserva * (valorComissao));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      reservaService.atualizarReserva(parseInt(id), reserva);
    } else {
      reservaService.adicionarReserva(reserva);
    }
    navigate("/reservas");
  };

  return (
    <div className={styles.reservaForm}>
      <h4>{id ? "Alterar Reserva" : "Nova Reserva"}</h4>
      <div className={styles.row}>
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="my-14">
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Tipo de Reserva
              </label>
              <div className={styles.colSm9}>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="modalidade"
                    value="temporada"
                    checked={reserva.modalidade === "temporada"}
                    onChange={handleModalidadeChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Temporada</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="modalidade"
                    value="fixa"
                    checked={reserva.modalidade === "fixa"}
                    onChange={handleModalidadeChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Fixa</label>
                </div>
              </div>
            </div>

            {/* Campos comuns */}
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Cliente
              </label>
              <div className={styles.colSm9}>
                <select
                  name="clienteId"
                  value={reserva.clienteId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Imovel
              </label>
              <div className={styles.colSm9}>
                <select
                  name="imovelId"
                  value={reserva.imovelId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecione um imovel</option>
                  {imoveis.map((imovel) => (
                    <option key={imovel.id} value={imovel.id}>
                      {imovel.descricao}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Data da Reserva
              </label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataReserva"
                  value={reserva.dataReserva}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Data de Entrada
              </label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataEntrada"
                  value={reserva.dataEntrada}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Data de Saida
              </label>
              <div className={styles.colSm9}>
                <input
                  type="date"
                  name="dataSaida"
                  value={reserva.dataSaida}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Origem
              </label>
              <div className={styles.colSm9}>
                <select
                  name="origem"
                  value={reserva.origem}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {opcoesOrigem.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Forma de Pagamento
              </label>
              <div className={styles.colSm9}>
                <select
                  name="formaPagamento"
                  value={reserva.formaPagamento}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {opcoesFormaPagamento.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Valor da Locação
              </label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorReserva"
                  value={valorReservaFormatado}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Valor da Comissão
              </label>
              <div className={styles.colSm9}>
                <div className="input-group">
                  <select
                    name="tipoComissao"
                    value={reserva.tipoComissao}
                    onChange={handleTipoComissaoChange}
                    className="form-control"
                    style={{ maxWidth: "60px" }}
                  >
                    <option value="R$">R$</option>
                    <option value="%">%</option>
                  </select>
                  <input
                    type="text"
                    name="valorComissao"
                    value={valorComissaoFormatado}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
            {reserva.modalidade === "temporada" && (
              <>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Taxa de Limpeza
              </label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="taxaLimpeza"
                  value={taxaLimpezaFormatado}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            </>
            )}
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Valor Final
              </label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="valorFinal"
                  value={formatCurrency(calcularValorFinal())}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>

            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Situação
              </label>
              <div className={styles.colSm9}>
                <select
                  name="origem"
                  value={reserva.situacao}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {opcoesSituacao.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {reserva.modalidade === "fixa" && (
              <>
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Renovação Automática
              </label>
              <div className={styles.colSm9}>
                <input
                  type="text"
                  name="renovacaoAutomatica"
                  value={reserva.renovacaoAutomatica}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            </>
            )}
            <div className={`form-group ${styles.row} ${styles.linha}`}>
              <label
                className={`${styles.colSm3} col-form-label ${styles.textRight}`}
              >
                Observações
              </label>
              <div className={styles.colSm9}>
                <textarea
                  name="observacoes"
                  value={reserva.observacoes}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                {id ? "Atualizar" : "Salvar"}
              </button>
              <Link to="/reservas" className="btn btn-secondary ml-2">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservaForm;
