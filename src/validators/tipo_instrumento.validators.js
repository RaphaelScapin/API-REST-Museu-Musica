const { body, param } = require('express-validator')

const validarTipoInstrumento = [
    body('descricao')
        .exists()
        .withMessage('A descrição é obrigatória')
        .bail()
        .isString()
        .withMessage('A descrição deve ser um texto')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('A descrição não pode estar vazia')
        .isLength({ max: 100 })
        .withMessage('A descrição deve ter no máximo 100 caracteres')
]

const validarIdTipoInstrumento = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('O ID deve ser um número inteiro positivo')
]

module.exports = {
    validarTipoInstrumento,
    validarIdTipoInstrumento
}
