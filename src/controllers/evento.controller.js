const eventoRepository = require('../repositories/evento.repository')

async function listar(req, res, next) {
    try {
        const eventos = await eventoRepository.listar()

        return res.json({
            total: eventos.length,
            dados: eventos
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const evento = await eventoRepository.buscarPorId(id)

        if (!evento) {
            return res.status(404).json({
                erro: 'Evento não encontrado'
            })
        }

        return res.json(evento)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const evento = await eventoRepository.criar(req.body)

        return res.status(201).json({
            mensagem: 'Evento cadastrado com sucesso',
            dados: evento
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const evento = await eventoRepository.atualizar(id, req.body)

        if (!evento) {
            return res.status(404).json({
                erro: 'Evento não encontrado para atualização'
            })
        }

        return res.json({
            mensagem: 'Evento atualizado com sucesso',
            dados: evento
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const removido = await eventoRepository.remover(id)

        if (!removido) {
            return res.status(404).json({
                erro: 'Evento não encontrado'
            })
        }

        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
