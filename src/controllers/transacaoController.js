import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function realizarTransacao(clienteId, transacao) {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: clienteId,
    },
  });

  if (!cliente) {
    return null;
  }

  const { valor, tipo, descricao } = transacao;

  if (tipo === 'c') {
    cliente.saldo += valor;
  } else if (tipo === 'd') {
    if (cliente.saldo - valor < -cliente.limite) {
      return null;
    }
    cliente.saldo -= valor;
  }

  const novaTransacao = {
    id: uuidv4(),
    valor,
    tipo,
    descricao,
    realizada_em: new Date().toISOString(),
  };

  await prisma.cliente.update({
    where: {
      id: clienteId,
    },
    data: {
      saldo: cliente.saldo,
      nome: cliente.nome,
      limite: cliente.limite,
      transacoes: {
        create: novaTransacao,
      },
    },
  });

  return {
    limite: cliente.limite,
    saldo: cliente.saldo,
  };
}