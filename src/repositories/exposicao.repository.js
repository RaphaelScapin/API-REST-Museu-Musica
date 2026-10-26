const { pool } = require('../config/database')
const consultarExposicao = 'select * from exposicao'

function montarExposicao(linha) {
    return {
        id_exposicao: linha.id_exposicao,
        titulo: linha.titulo,
        descricao: linha.descricao,
        data_inicio: linha.data_inicio,
        data_fim_previsto: linha.data_fim_previsto,
        data_fim_real: linha.data_fim_real,
        status: linha.status
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarExposicao)
    return linhas.map(montarExposicao)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultarExposicao} WHERE id_exposicao = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarExposicao(linhas[0])
}

async function criar(dadosExposicao) {
    const exposicao = {
        titulo: dadosExposicao.titulo,
        descricao: dadosExposicao.descricao,
        data_inicio: dadosExposicao.data_inicio,
        data_fim_previsto: dadosExposicao.data_fim_previsto,
        status: dadosExposicao.status
    }
    const sql = 'INSERT INTO exposicao SET ?'
    const [resultado] = await pool.query(sql, [exposicao])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosExposicao) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoExposicao] = await conexao.execute(`UPDATE exposicao SET titulo=?, descricao=?, data_inicio=?, data_fim_previsto=?, data_fim_real=?, status=? WHERE id_exposicao=?`, [dadosExposicao.titulo, dadosExposicao.descricao, dadosExposicao.data_inicio, dadosExposicao.data_fim_previsto, dadosExposicao.data_fim_real, dadosExposicao.status, id])

        if (resultadoExposicao.affectedRows === 0) {
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
    const [resultado] = await pool.execute('DELETE FROM exposicao WHERE id_exposicao=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }