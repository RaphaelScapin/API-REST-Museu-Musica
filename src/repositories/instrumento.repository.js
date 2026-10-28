
const { pool } = require('../config/database')

const consultarInstrumento = 'SELECT * FROM instrumento'

function montarInstrumento(linha) {
    return {
        id_instrumento: linha.id_instrumento,
        id_tipo: linha.id_tipo,
        nome: linha.nome,
        ano_fabricacao: linha.ano_fabricacao,
        antigo_dono: linha.antigo_dono,
        link_som: linha.link_som
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarInstrumento)
    return linhas.map(montarInstrumento)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        `${consultarInstrumento} WHERE id_instrumento = ?`,
        [id]
    )

    if (linhas.length === 0) {
        return null
    }

    return montarInstrumento(linhas[0])
}

async function criar(dadosInstrumento) {
    const instrumento = {
        id_tipo: dadosInstrumento.id_tipo,
        nome: dadosInstrumento.nome,
        ano_fabricacao: dadosInstrumento.ano_fabricacao,
        antigo_dono: dadosInstrumento.antigo_dono,
        link_som: dadosInstrumento.link_som
    }

    const sql = 'INSERT INTO instrumento SET ?'
    const [resultado] = await pool.query(sql, instrumento)

    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosInstrumento) {
    const sql = `UPDATE instrumento
        SET id_tipo = ?, nome = ?, ano_fabricacao = ?,
        antigo_dono = ?, link_som = ?
        WHERE id_instrumento = ?`

    const [resultado] = await pool.query(sql, [
        dadosInstrumento.id_tipo,
        dadosInstrumento.nome,
        dadosInstrumento.ano_fabricacao,
        dadosInstrumento.antigo_dono,
        dadosInstrumento.link_som,
        id
    ])

    if (resultado.affectedRows === 0) {
        return null
    }

    return buscarPorId(id)
}

async function remover(id) {
    const sql = 'DELETE FROM instrumento WHERE id_instrumento = ?'
    const [resultado] = await pool.query(sql, [id])

    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
