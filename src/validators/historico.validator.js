
const { body } = require('express-validator')

const validarHistorico = [
    body('id_agendamento')
        .exists({ checkFalsy: true })
        .withMessage('O id_agendamento é obrigatório')
        .bail()
        .isInt({ min: 1 })
        .withMessage('O id_agendamento deve ser um número inteiro positivo'),

    body('data_visita')
        .optional({ nullable: true })
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('A data_visita deve ser uma data válida no formato AAAA-MM-DD'),

    body('status')
        .optional({ nullable: true })
        .isString()
        .withMessage('O status deve ser um texto')
        .bail()
        .isLength({ max: 50 })
        .withMessage('O status deve ter no máximo 50 caracteres')
]

module.exports = { validarHistorico }
