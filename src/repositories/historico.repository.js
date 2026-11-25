
const { pool } = require('../config/database')

const consultarHistorico = 'SELECT * FROM historico'

function montarHistorico(linha) {
    return {
        id_historico: linha.id_historico,
        id_agendamento: linha.id_agendamento,
        data_visita: linha.data_visita,
        status: linha.status
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarHistorico)
    return linhas.map(montarHistorico)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        `${consultarHistorico} WHERE id_historico = ?`,
        [id]
    )

    if (linhas.length === 0) {
        return null
    }

    return montarHistorico(linhas[0])
}

async function criar(dadosHistorico) {
    const historico = {
        id_agendamento: dadosHistorico.id_agendamento,
        data_visita: dadosHistorico.data_visita,
        status: dadosHistorico.status
    }

    const sql = 'INSERT INTO historico SET ?'
    const [resultado] = await pool.query(sql, historico)

    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosHistorico) {
    const conexao = await pool.getConnection()

    try {
        await conexao.beginTransaction()

        const sql = `UPDATE historico
            SET id_agendamento = ?, data_visita = ?, status = ?
            WHERE id_historico = ?`

        const [resultado] = await conexao.execute(sql, [
            dadosHistorico.id_agendamento,
            dadosHistorico.data_visita,
            dadosHistorico.status,
            id
        ])

        if (resultado.affectedRows === 0) {
            await conexao.rollback()
            return null
        }

        await conexao.commit()
        return buscarPorId(id)

    } catch (erro) {
        await conexao.rollback()
        throw erro
    } finally {
        conexao.release()
    }
}

async function remover(id) {
    const sql = 'DELETE FROM historico WHERE id_historico = ?'
    const [resultado] = await pool.query(sql, [id])

    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
