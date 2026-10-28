
function validarHistorico(req, res, next) {
    const { id_agendamento, data_visita, status } = req.body
    const erros = []

    if (!Number.isInteger(Number(id_agendamento)) || Number(id_agendamento) <= 0) {
        erros.push('O id_agendamento deve ser um número inteiro positivo')
    }

    if (data_visita && isNaN(Date.parse(data_visita))) {
        erros.push('A data_visita deve ser uma data válida')
    }

    if (status !== undefined && status !== null && typeof status !== 'string') {
        erros.push('O status deve ser um texto')
    }

    if (status && status.length > 50) {
        erros.push('O status deve ter no máximo 50 caracteres')
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros })
    }

    return next()
}

module.exports = { validarHistorico }
