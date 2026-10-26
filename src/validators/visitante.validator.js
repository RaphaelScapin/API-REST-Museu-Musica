const { body, param } = require('express-validator')

const validarVisitante = [
    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome do visitante é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('O nome do visitante deve ter entre 3 e 100 caracteres'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('O email é obrigatório')
        .bail()
        .trim()
        .isEmail()
        .withMessage('Informe um e-mail válido'),

    body('quant_visitas')
        .exists({ checkFalsy: true })
        .withMessage('A quantidade de visitas é obrigatória')
        .isInt({ min: 0, max: 999999 })
        .withMessage('A quantidade de visitas deve ser positiva e menor que 1 milhão')
]

module.exports = { validarVisitante }