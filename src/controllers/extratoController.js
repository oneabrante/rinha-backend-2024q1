import { obterCliente } from "../models/cliente.model.js";

export async function gerarExtrato(clienteId) {
  if (isNaN(clienteId)) {
    return null;
  }

  const cliente = await obterCliente(clienteId);

  if (!cliente) {
    return null;
  }

  const { saldo, limite, nome, transacoes } = cliente;

  const saldoTotal = saldo;
  const dataExtrato = new Date().toISOString();
  const ultimasTransacoes = transacoes.slice(0, 10);

  const extrato = {
    saldo: {
      nome,
      total: saldoTotal,
      data_extrato: dataExtrato,
      limite,
    },
    ultimas_transacoes: ultimasTransacoes.map(({ valor, tipo, descricao, realizada_em }) => ({
      valor,
      tipo,
      descricao,
      realizada_em,
    })),
  };

  return extrato;
}
