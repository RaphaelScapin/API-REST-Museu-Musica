const { pool } = require('../config/database')
const consultarAgendamento = 'select * from agendamento'

function montarAgendamento(linha) {
    return {
        id_agendamento: linha.id_agendamento,
        id_visitante: linha.id_visitante,
        id_exposicao: linha.id_exposicao,
        data_agendada: linha.data_agendada,
        hora_agendada: linha.hora_agendada,
        status_agendamento: linha.status_agendamento
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarAgendamento)
    return linhas.map(montarAgendamento)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultarAgendamento} WHERE id_agendamento = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarAgendamento(linhas[0])
}

async function criar(dadosAgendamento) {
    const agendamento = {
        id_visitante: dadosAgendamento.id_visitante,
        id_exposicao: dadosAgendamento.id_exposicao,
        data_agendada: dadosAgendamento.data_agendada,
        hora_agendada: dadosAgendamento.hora_agendada,
        status_agendamento: dadosAgendamento.status_agendamento
    }
    const sql = 'INSERT INTO agendamento SET ?'
    const [resultado] = await pool.query(sql, [agendamento])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosAgendamento) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoAgendamento] = await conexao.execute(`UPDATE agendamento SET data_agendada=?, hora_agendada=?, status_agendamento=? WHERE id_agendamento=?`, [dadosAgendamento.data_agendada, dadosAgendamento.hora_agendada, dadosAgendamento.status_agendamento, id])

        if (resultadoAgendamento.affectedRows === 0) {
            await conexao.rollback()
            return null
        }

        await conexao.commit()
        return buscarPorId(id)
    } catch (erro) {
        await conexao.rollback()
        throw erro
    } finally { conexao.release() }
}

async function remover(id) {
    const [resultado] = await pool.execute('DELETE FROM agendamento WHERE id_agendamento=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }