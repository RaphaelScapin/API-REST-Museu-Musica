const { randomUUID } = require('node:crypto')
const { pool } = require('../config/database')

const consulta = `SELECT CAST(id as CHAR) as id, email, status, tipo, data_criacao as dataCriacao, data_alteracao as dataAlteracao from usuarios`

async function listar() {
    const [linhas] = await pool.query(`${consulta} ORDER BY data_criacao`)
    return linhas
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consulta} WHERE id = ?`, [id])
    return linhas[0] || null
}

async function buscarParaLogin(email) {
    const [linhas] = await pool.execute(`SELECT CAST(id as CHAR) as id, email, senha_hash, status, tipo FROM usuarios WHERE email = ?`, [email])
    return linhas[0] || null
}

async function criar({ email, senhaHash, status = 'ativo', tipo = 'User' }) {
    const id = randomUUID()
    await pool.execute(`INSERT INTO usuarios (id, email, senha_hash, status, tipo) VALUES (?, ?, ?, ?, ?)`, [id, email, senhaHash, status, tipo])
    return buscarPorId(id)
}

module.exports = { listar, buscarPorId, buscarParaLogin, criar }