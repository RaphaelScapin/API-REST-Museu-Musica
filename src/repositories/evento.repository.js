const { pool } = require('../config/database')

const consultarEvento = 'select * from evento'

function montarEvento(linha) {
    return {
        id_evento: linha.id_evento,
        nome_evento: linha.nome_evento,
        email_contato: linha.email_contato,
        telefone_contato: linha.telefone_contato,
        local: linha.local,
        data_inicio: linha.data_inicio,
        data_fim_previsto: linha.data_fim_previsto,
        data_fim_real: linha.data_fim_real
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarEvento)
    return linhas.map(montarEvento)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        `${consultarEvento} WHERE id_evento = ?`,
        [id]
    )
    if (linhas.length === 0) { return null }
    return montarEvento(linhas[0])
}

async function criar(dadosEvento) {
    const evento = {
        nome_evento: dadosEvento.nome_evento,
        email_contato: dadosEvento.email_contato,
        telefone_contato: dadosEvento.telefone_contato,
        local: dadosEvento.local,
        data_inicio: dadosEvento.data_inicio,
        data_fim_previsto: dadosEvento.data_fim_previsto,
        data_fim_real: dadosEvento.data_fim_real
    }

    const sql = 'INSERT INTO evento SET ?'
    const [resultado] = await pool.query(sql, evento)
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosEvento) {
    const evento = {
        nome_evento: dadosEvento.nome_evento,
        email_contato: dadosEvento.email_contato,
        telefone_contato: dadosEvento.telefone_contato,
        local: dadosEvento.local,
        data_inicio: dadosEvento.data_inicio,
        data_fim_previsto: dadosEvento.data_fim_previsto,
        data_fim_real: dadosEvento.data_fim_real
    }

    const sql = 'UPDATE evento SET ? WHERE id_evento = ?'
    const [resultado] = await pool.query(sql, [evento, id])

    if (resultado.affectedRows === 0) { return null }
    return buscarPorId(id)
}

async function remover(id) {
    const sql = 'DELETE FROM evento WHERE id_evento = ?'
    const [resultado] = await pool.query(sql, [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
