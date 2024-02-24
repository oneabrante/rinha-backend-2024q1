import prisma from "../database/index.js";

export async function obterCliente(clienteId) {
  if (isNaN(clienteId)) {
    return null;
  }

  const cliente = await prisma.cliente.findUnique({
    where: {
      id: parseInt(clienteId),
    },
    select: {
      id: true,
      nome: true,
      limite: true,
      saldo: true,
      transacoes: true,
    },
  });

  return cliente;
}