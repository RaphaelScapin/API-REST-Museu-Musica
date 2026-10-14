const { body, param } = require('express-validator')
const statusExposicao = ['Em andamento', 'Indisponível']

const validarExposicao = [
    body('titulo')
        .exists({ checkFalsy: true })
        .withMessage('O titulo da exposição é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('O titulo da exposição deve ter entre 1 e 100 caracteres'),

    body('descricao')
        .optional()
        .trim()
        .isLength({ min: 1, max: 250 })
        .withMessage('A descrição da exposição deve ter entre 1 e 250 caracteres'),

    body('data_inicio')
        .exists({ checkFalsy: false })
        .withMessage('A data de início é obrigatória')
        .bail()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('data_fim_previsto')
        .exists({ checkFalsy: false })
        .withMessage('A data de fim previsto é obrigatória')
        .bail()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('data_fim_real')
        .optional()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('status')
        .exists({ checkFalsy: true })
        .withMessage('O status da exposição é obrigatório')
        .bail()
        .isIn(statusExposicao)
        .withMessage('O status da exposição deve ser "Em andamento" ou "Indisponível"')
]

module.exports = { validarExposicao }