
function validarInstrumento(req, res, next) {
    const {
        id_tipo,
        nome,
        ano_fabricacao,
        antigo_dono,
        link_som
    } = req.body

    const erros = []

    if (!Number.isInteger(Number(id_tipo)) || Number(id_tipo) <= 0) {
        erros.push('O id_tipo deve ser um número inteiro positivo')
    }

    if (typeof nome !== 'string' || nome.trim() === '') {
        erros.push('O nome do instrumento é obrigatório')
    }

    if (
        ano_fabricacao !== undefined &&
        ano_fabricacao !== null &&
        (!Number.isInteger(Number(ano_fabricacao)) ||
            Number(ano_fabricacao) <= 0)
    ) {
        erros.push('O ano de fabricação deve ser um número inteiro positivo')
    }

    if (
        antigo_dono !== undefined &&
        antigo_dono !== null &&
        typeof antigo_dono !== 'string'
    ) {
        erros.push('O antigo dono deve ser um texto')
    }

    if (
        link_som !== undefined &&
        link_som !== null &&
        typeof link_som !== 'string'
    ) {
        erros.push('O link do som deve ser um texto')
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros })
    }

    return next()
}

module.exports = { validarInstrumento }
