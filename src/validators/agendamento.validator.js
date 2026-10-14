const { body, param } = require('express-validator')
const { pool } = require('../config/database')

const statusAgendamento = ['Finalizado', 'Cancelado']

const validarAgendamento = [
    body('id_visitante')
        .exists({ checkFalsy: true })
        .withMessage('O id do visitante é obrigatório')
        .bail()
        .isInt({ min: 1 })
        .withMessage('O id do visitante deve ser um número maior ou igual a 1')
         .custom(async (id) => {
        const [linhas] = await pool.query(
            'SELECT id_visitante FROM visitante WHERE id_visitante = ?',
            [id]
        )
        if (linhas.length === 0) {
            throw new Error('O id deve pertencer a um visitante real')
        }
        return true
    }),

    body('id_exposicao')
        .exists({ checkFalsy: true })
        .withMessage('O id da exposição é obrigatório')
        .bail()
        .isInt({ min: 1 })
        .withMessage('O id da exposição deve ser um número maior ou igual a 1')
        .custom(async (id) => {
        const [linhas] = await pool.query(
            'SELECT id_exposicao FROM exposicao WHERE id_exposicao = ?',
            [id]
        )
        if (linhas.length === 0) {
            throw new Error('O id deve pertencer a um exposição real')
        }
        return true
    }),

    body('data_agendada')
        .exists({ checkFalsy: false })
        .withMessage('A data agendada é obrigatória')
        .bail()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('hora_agendada')
        .exists({ checkFalsy: false })
        .withMessage('A hora agendada é obrigatória')
        .bail()
        .isTime({hourFormat:'hour24', mode:'default'})
        .withMessage('Use uma hora válida no formato HH:mm (Relógio de 24h)'),

    body('status_agendamento')
        .optional()
        .isIn(statusAgendamento)
        .withMessage('O status do agendamento deve ser "Finalizado" ou "Cancelado"'),
]

module.exports = { validarAgendamento }