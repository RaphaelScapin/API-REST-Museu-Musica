const { body, param } = require('express-validator')

//const anoAtual = new Date().getFullYear()

const validarPartitura = [
    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome da partitura é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('O nome da partitura deve ter entre 1 e 100 caracteres'),

    body('autor')
        .exists({ checkFalsy: true })
        .withMessage('O autor é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('O nome do autor deve ter entre 1 e 100 caracteres'),

    body('ano')
        .exists({ checkFalsy: true })
        .withMessage('O ano da partitura é obrigatório')
        .isInt({ min: 0, max: 2025 }) //?pq 2025
        .withMessage('O ano da partitura deve estar entre 0 e 2025'),

    body('link_musica')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('O link da música deve ter entre 1 e 255 caracteres'),

    body('arquivo_partitura')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('O arquivo da partitura deve ter entre 1 e 255 caracteres'),
]

module.exports = { validarPartitura }