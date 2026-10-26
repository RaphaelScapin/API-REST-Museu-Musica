const { pool } = require('../config/database')
const consultarSala = 'select * from sala'

function montarSala(linha) {
    return {
        num_sala: linha.num_sala,
        nome: linha.nome,
        descricao: linha.descricao,
        capacidade: linha.capacidade
    }
}

async function listar() {
    const [linhas] = await pool.query(consultarSala)
    return linhas.map(montarSala)
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultarSala} WHERE num_sala = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarSala(linhas[0])
}

async function criar(dadosSala) {
    const sala = {
        num_sala: dadosSala.num_sala,
        nome: dadosSala.nome,
        descricao: dadosSala.descricao,
        capacidade: dadosSala.capacidade
    }
    const sql = 'INSERT INTO sala SET ?'
    const [resultado] = await pool.query(sql, [sala])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosSala) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoSala] = await conexao.execute(`UPDATE sala SET nome=?, descricao=?, capacidade=? WHERE num_sala=?`, [dadosSala.nome, dadosSala.descricao, dadosSala.capacidade, id])

        if (resultadoSala.affectedRows === 0) {
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
    const [resultado] = await pool.execute('DELETE FROM sala WHERE num_sala=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }