import express from 'express';
import { realizarTransacao } from './controllers/transacaoController.js';
import { gerarExtrato } from './controllers/extratoController.js';
import { obterCliente } from './models/cliente.model.js';


const router = express.Router();

router.post('/clientes/:id/transacoes', async (req, res) => {
    const clienteId = req.params.id.toString();
    const transacao = req.body;

    if (!clienteId.match(/^\d+$/) || !obterCliente(parseInt(clienteId))) {
        return res.status(404).send('Cliente não encontrado');
    }

    if (!transacao.valor || !transacao.tipo || !transacao.descricao) {
        return res.status(422).send('Parâmetros inválidos');
    }

    if (transacao.tipo !== 'd' && transacao.tipo !== 'c') {
        return res.status(422).send('Tipo de transação inválido');
    }

    if (transacao.descricao.length < 1 || transacao.descricao.length > 10) {
        return res.status(422).send('Descrição inválida');
    }

    if (!Number.isInteger(transacao.valor) || transacao.valor <= 0) {
        return res.status(422).send('Valor inválido');
    }

    const resultado = await realizarTransacao(parseInt(clienteId), transacao);

    if (!resultado) {
        return res.status(422).send('Transação inválida');
    }

    return res.status(200).json(resultado);
});

router.get('/clientes/:id/extrato', async (req, res) => {
    const clienteId = req.params.id.toString();

    if (!clienteId.match(/^\d+$/) || parseInt(clienteId) < 1 || parseInt(clienteId) > 5) {
        return res.status(404).send('Cliente não encontrado');
    }

    if (!obterCliente(parseInt(clienteId))) {
        return res.status(404).send('Cliente não encontrado');
    }

    const resultado = await gerarExtrato(parseInt(clienteId));

    if (!resultado) {
        return res.status(422).send('Erro ao gerar extrato');
    }

    return res.status(200).json(resultado);
});

export default router;