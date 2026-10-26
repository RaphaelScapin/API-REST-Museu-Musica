const { pool } = require('../config/database')
const consultarPartitura = 'select * from partitura'

function montarPartitura(linha) {
    return {
        id_partitura: linha.id_partitura,
        nome: linha.nome,
        autor: linha.autor,
        ano: linha.ano,
        link_musica: linha.link_musica,
        arquivo_partitura: linha.arquivo_partitura
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarPartitura)
    return linhas.map(montarPartitura)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultarPartitura} WHERE id_partitura = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarPartitura(linhas[0])
}

async function criar(dadosPartitura) {
    const partitura = {
        nome: dadosPartitura.nome,
        autor: dadosPartitura.autor,
        ano: dadosPartitura.ano,
        link_musica: dadosPartitura.link_musica ?? null,
        arquivo_partitura: dadosPartitura.arquivo_partitura ?? null

    }
    const sql = 'INSERT INTO partitura SET ?'
    const [resultado] = await pool.query(sql, [partitura])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosPartitura) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoPartitura] = await conexao.execute(`UPDATE partitura SET nome=?, autor=?, ano=?, link_musica=?, arquivo_partitura=? WHERE id_partitura=?`, [dadosPartitura.nome, dadosPartitura.autor, dadosPartitura.ano, dadosPartitura.link_musica || null, dadosPartitura.arquivo_partitura || null, id])

        if (resultadoPartitura.affectedRows === 0) {
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
    const [resultado] = await pool.execute('DELETE FROM partitura WHERE id_partitura=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }