const { body, param } = require('express-validator')
const { pool } = require('../config/database')

const validarSala = [
    body('num_sala')
        .exists({ checkFalsy: true })
        .withMessage('O número da sala é obrigatório')
        .bail()
        .isInt({ min: 1, max: 10 })
        .withMessage('O número da sala deve ser um número entre 1 e 10')
        .bail()
        .custom(async (id, { req }) => {
            const numAtual = req.params.id
            if (numAtual !== undefined && Number(numAtual) === Number(id)) {
                return true
            }

            const [linhas] = await pool.query(
                'SELECT num_sala FROM sala WHERE num_sala=?',
                [id]
            )
            if (linhas.length) {
                throw new Error('O número da sala não deve ser igual ao de outra')
            }
            return true
        }),

    body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O nome da sala é obrigatório')
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('O nome da sala deve ter entre 1 e 100 caracteres'),

    body('descricao')
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('A descrição da sala deve ter entre 1 e 200 caracteres'),

    body('capacidade')
        .exists({ checkFalsy: true })
        .withMessage('A capacidade da sala é obrigatória')
        .bail()
        .isInt({ min: 1 })
        .withMessage('A capacidade da sala deve ser positiva e maior que 1')
]

module.exports = { validarSala }