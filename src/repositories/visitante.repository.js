const { pool } = require('../config/database')
const consultarVisitante = 'select * from visitante'

function montarVisitante(linha) {
    return {
        id_visitante: linha.id_visitante,
        nome: linha.nome,
        email: linha.email,
        data_cadastro: linha.data_cadastro,
        quant_visitas: linha.quant_visitas
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarVisitante)
    return linhas.map(montarVisitante)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultarVisitante} WHERE id_visitante = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarVisitante(linhas[0])
}

async function criar(dadosVisitante) {
    const visitante = {
        nome: dadosVisitante.nome,
        email: dadosVisitante.email,
        quant_visitas: dadosVisitante.quant_visitas
    }
    const sql = 'INSERT INTO visitante SET ?'
    const [resultado] = await pool.query(sql, [visitante])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosVisitante) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoVisitante] = await conexao.execute(`UPDATE visitante SET nome=?, email=?, quant_visitas=? WHERE id_visitante=?`, [dadosVisitante.nome, dadosVisitante.email, dadosVisitante.quant_visitas, id])

        if (resultadoVisitante.affectedRows === 0) {
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
    const [resultado] = await pool.execute('DELETE FROM visitante WHERE id_visitante=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }