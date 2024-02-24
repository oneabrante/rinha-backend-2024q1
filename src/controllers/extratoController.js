import { obterCliente } from "../models/cliente.model.js";

export async function gerarExtrato(clienteId) {
  if (isNaN(clienteId)) {
    return null;
  }

  const cliente = await obterCliente(clienteId);

  if (!cliente) {
    return null;
  }

  const saldoTotal = cliente.saldo;
  const limite = cliente.limite;
  const nome = cliente.nome;
  const dataExtrato = new Date().toISOString();
  const ultimasTransacoes = cliente.transacoes.slice(0, 10);
  
  const saldoFinal = saldoTotal;
  if (ultimasTransacoes.length > 0) {
    ultimasTransacoes.reduce((acc, transacao) => {
      if (transacao.tipo === 'c') {
        acc += transacao.valor;
      } else if (transacao.tipo === 'd') {
        acc -= transacao.valor;
      }
      return acc;
    }, saldoFinal);
  }

  const extrato = {
    saldo: {
      nome: nome,
      total: saldoTotal,
      data_extrato: dataExtrato,
      limite: limite,
    },
    ultimas_transacoes: ultimasTransacoes.map(transacao => ({
      valor: transacao.valor,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      realizada_em: transacao.realizada_em,
    })),
  };

  return extrato;
}
