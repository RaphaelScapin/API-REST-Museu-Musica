const { body, param } = require('express-validator')

const validarEvento = [
    body('nome_evento')
        .exists()
        .withMessage('O nome do evento é obrigatório')
        .bail()
        .isString()
        .withMessage('O nome deve ser um texto')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('O nome não pode estar vazio')
        .isLength({ max: 100 })
        .withMessage('O nome deve ter no máximo 100 caracteres'),

    body('email_contato')
        .exists()
        .withMessage('O e-mail é obrigatório')
        .bail()
        .isEmail()
        .withMessage('Informe um e-mail válido')
        .normalizeEmail()
        .isLength({ max: 150 })
        .withMessage('O e-mail deve ter no máximo 150 caracteres'),

    body('telefone_contato')
        .optional({ nullable: true })
        .isString()
        .withMessage('O telefone deve ser um texto')
        .isLength({ max: 20 })
        .withMessage('O telefone deve ter no máximo 20 caracteres'),

    body('local')
        .exists()
        .withMessage('O local é obrigatório')
        .bail()
        .isString()
        .withMessage('O local deve ser um texto')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('O local não pode estar vazio')
        .isLength({ max: 150 })
        .withMessage('O local deve ter no máximo 150 caracteres'),

    body('data_inicio')
        .exists()
        .withMessage('A data de início é obrigatória')
        .bail()
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('Informe uma data válida no formato AAAA-MM-DD'),

    body('data_fim_previsto')
        .exists()
        .withMessage('A data de fim prevista é obrigatória')
        .bail()
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('Informe uma data válida no formato AAAA-MM-DD')
        .custom((valor, { req }) => {
            if (
                /^\d{4}-\d{2}-\d{2}$/.test(req.body.data_inicio) &&
                valor < req.body.data_inicio
            ) {
                throw new Error('A data final prevista não pode ser anterior à data de início')
            }
            return true
        }),

    body('data_fim_real')
        .optional({ nullable: true })
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('Informe uma data válida no formato AAAA-MM-DD')
]

const validarIdEvento = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('O ID deve ser um número inteiro positivo')
]

module.exports = { validarEvento, validarIdEvento }
