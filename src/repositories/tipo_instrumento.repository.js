
const { pool } = require('../config/database')

const consultarTipoInstrumento = 'select * from tipo_instrumento'

function montarTipoInstrumento(linha) {
    return {
        id_tipo: linha.id_tipo,
        descricao: linha.descricao
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarTipoInstrumento)
    return linhas.map(montarTipoInstrumento)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        `${consultarTipoInstrumento} WHERE id_tipo = ?`,
        [id]
    )
    if (linhas.length === 0) { return null }
    return montarTipoInstrumento(linhas[0])
}

async function criar(dadosTipoInstrumento) {
    const tipoInstrumento = {
        descricao: dadosTipoInstrumento.descricao
    }

    const sql = 'INSERT INTO tipo_instrumento SET ?'
    const [resultado] = await pool.query(sql, tipoInstrumento)
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosTipoInstrumento) {
    const sql = 'UPDATE tipo_instrumento SET descricao = ? WHERE id_tipo = ?'
    const [resultado] = await pool.query(sql, [
        dadosTipoInstrumento.descricao,
        id
    ])

    if (resultado.affectedRows === 0) { return null }
    return buscarPorId(id)
}

async function remover(id) {
    const sql = 'DELETE FROM tipo_instrumento WHERE id_tipo = ?'
    const [resultado] = await pool.query(sql, [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
