const { randomUUID } = require('node:crypto')
const { pool } = require('../config/database')

const consulta = `SELECT CAST(id_usuario as CHAR) as id_usuario, email, status, data_criacao as dataCriacao, data_alteracao as dataAlteracao from usuario`

async function listar() {
    const [linhas] = await pool.query(`${consulta} ORDER BY data_criacao`)
    return linhas
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consulta} WHERE id_usuario = ?`, [id])
    return linhas[0] || null
}

async function buscarParaLogin(email) {
    const [linhas] = await pool.execute(`SELECT CAST(id_usuario as CHAR) as id_usuario, email, senha_hash, status FROM usuario WHERE email = ?`, [email])
    return linhas[0] || null
}

async function criar(dadosUsuario) {
  const id = crypto.randomUUID();
  const [resultado] = await pool.execute(
    "INSERT INTO usuario (id_usuario, email, senha_hash, status) VALUES (?, ?, ?, ?)",
    [
      id,
      dadosUsuario.email,
      dadosUsuario.senhaHash,
      dadosUsuario.status
    ],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}

async function atualizar(id, dadosUsuario) {
    const conexao = await pool.getConnection()
    try {
        await conexao.beginTransaction()
        const [resultadoUsuario] = await conexao.execute(`UPDATE usuario SET email=?, senha_hash=?, status=? WHERE id_usuario=?`, [dadosUsuario.email, dadosUsuario.senhaHash, dadosUsuario.status, id])

        if (resultadoUsuario.affectedRows === 0) {
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
    const [resultado] = await pool.execute('DELETE FROM usuario WHERE id_usuario=?', [id])
    return resultado.affectedRows > 0
}

module.exports = { listar, buscarPorId, buscarParaLogin, criar, atualizar, remover }