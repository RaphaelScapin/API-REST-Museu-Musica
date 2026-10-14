const {validationResult} = require('express-validator')

function validarResultado(req, res, next) {
    const resultado = validationResult(req)
    if(resultado.isEmpty()) {
        return next()
    }

    return res.status(400).json({
        erro: 'Dados inválidos!',
        detalhes: resultado.array().map((erro) => ({
            campo: erro.path,
            mensagem: erro.msg,
            valorRecebido: erro.value
        }))
    })
}

module.exports = validarResultado