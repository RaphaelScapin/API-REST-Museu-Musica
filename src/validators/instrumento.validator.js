
const { body } = require('express-validator')

const validarInstrumento = [
    body('id_tipo')
        .exists({ checkFalsy: true })
        .withMessage('O id_tipo é obrigatório')
        .bail()
        .isInt({ min: 1 })
        .withMessage('O id_tipo deve ser um número inteiro positivo'),

    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome do instrumento é obrigatório')
        .bail()
        .isString()
        .withMessage('O nome do instrumento deve ser um texto')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('O nome do instrumento não pode estar vazio'),

    body('ano_fabricacao')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('O ano de fabricação deve ser um número inteiro positivo'),

    body('antigo_dono')
        .optional({ nullable: true })
        .isString()
        .withMessage('O antigo dono deve ser um texto'),

    body('link_som')
        .optional({ nullable: true })
        .isString()
        .withMessage('O link do som deve ser um texto')
]

module.exports = { validarInstrumento }
