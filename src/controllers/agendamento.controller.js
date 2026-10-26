const agendamentoRepository = require('../repositories/agendamento.repository')

async function listar(req, res, next) {
    try {
        const agendamento = await agendamentoRepository.listar()
        return res.json({
            total: agendamento.length,
            dados: agendamento
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const agendamento = await agendamentoRepository.buscarPorId(id)
        if (!agendamento) {
            return res.status(404).json({
                erro: 'Agendamento não encontrado'
            })
        }
        return res.json(agendamento)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        agendamento = await agendamentoRepository.criar(req.body)
        return res.status(201).json({
            mensagem: 'Agendamento cadastrado com sucesso',
            dados: agendamento
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const agendamento = await agendamentoRepository.atualizar(id, req.body)
        if (!agendamento) {
            return res.status(404).json({
                erro: 'Agendamento não encontrado para a alteração'
            })
        }
        return res.json({
            mensagem: 'Agendamento atualizado com sucesso',
            dados: agendamento
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const agendamentoRemovido = await agendamentoRepository.remover(id)
        if (!agendamentoRemovido) {
            return res.status(404).json({
                erro: 'Agendamento não encontrado'
            })
        }
        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }