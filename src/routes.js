import express from 'express';
import { realizarTransacao } from './controllers/clienteController.js';
import { gerarExtrato } from './controllers/extratoController.js';
import { obterCliente } from './models/cliente.model.js';


const router = express.Router();

router.post('/clientes/:id/transacoes', async (req, res) => {
    const clienteId = parseInt(req.params.id);
    const transacao = req.body;

    if (!obterCliente(clienteId)) {
        return res.status(404).send('Cliente não encontrado');
    }

    if (!transacao.valor || !transacao.tipo || !transacao.descricao) {
        return res.status(400).send('Parâmetros inválidos');
    }

    const resultado = await realizarTransacao(clienteId, transacao);

    if (!resultado) {
        return res.status(422).send('Transação inválida');
    }

    return res.status(200).json(resultado);
});

router.get('/clientes/:id/extrato', async (req, res) => {
    const clienteId = parseInt(req.params.id);

    if (!obterCliente(clienteId)) {
        return res.status(404).send('Cliente não encontrado');
    }

    if (isNaN(clienteId)) {
        return res.status(404).send('Cliente não encontrado');
    }

    if (clienteId < 1 || clienteId > 5) {
        return res.status(404).send('Cliente não encontrado');
    }

    const resultado = await gerarExtrato(clienteId);

    if (!resultado) {
        return res.status(422).send('Erro ao gerar extrato');
    }

    return res.status(200).json(resultado);
});

export default router;