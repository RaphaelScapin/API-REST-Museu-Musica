const exposicaoRepository = require('../repositories/exposicao.repository')

async function listar(req, res, next) {
    try {
        const exposicao = await exposicaoRepository.listar()
        return res.json({
            total: exposicao.length,
            dados: exposicao
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const exposicao = await exposicaoRepository.buscarPorId(id)
        if (!exposicao) {
            return res.status(404).json({
                erro: 'Exposição não encontrada'
            })
        }
        return res.json(exposicao)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        exposicao = await exposicaoRepository.criar(req.body)
        return res.status(201).json({
            mensagem: 'Exposição cadastrada com sucesso',
            dados: exposicao
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const exposicao = await exposicaoRepository.atualizar(id, req.body)
        if (!exposicao) {
            return res.status(404).json({
                erro: 'Exposição não encontrada para a alteração'
            })
        }
        return res.json({
            mensagem: 'Exposição atualizada com sucesso',
            dados: exposicao
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const exposicaoRemovido = await exposicaoRepository.remover(id)
        if (!exposicaoRemovido) {
            return res.status(404).json({
                erro: 'Exposição não encontrado'
            })
        }
        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }