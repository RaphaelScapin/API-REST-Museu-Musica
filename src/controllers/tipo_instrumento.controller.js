const tipoInstrumentoRepository = require('../repositories/tipo_instrumento.repository')

async function listar(req, res, next) {
    try {
        const tipos = await tipoInstrumentoRepository.listar()
        return res.json({
            total: tipos.length,
            dados: tipos
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const tipo = await tipoInstrumentoRepository.buscarPorId(id)

        if (!tipo) {
            return res.status(404).json({
                erro: 'Tipo de instrumento não encontrado'
            })
        }

        return res.json(tipo)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const tipo = await tipoInstrumentoRepository.criar(req.body)

        return res.status(201).json({
            mensagem: 'Tipo de instrumento cadastrado com sucesso',
            dados: tipo
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const tipo = await tipoInstrumentoRepository.atualizar(id, req.body)

        if (!tipo) {
            return res.status(404).json({
                erro: 'Tipo de instrumento não encontrado para atualização'
            })
        }

        return res.json({
            mensagem: 'Tipo de instrumento atualizado com sucesso',
            dados: tipo
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const removido = await tipoInstrumentoRepository.remover(id)

        if (!removido) {
            return res.status(404).json({
                erro: 'Tipo de instrumento não encontrado'
            })
        }

        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
