const mysql = require('mysql2/promise')
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_rest_museu',
    dateString: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function testarConexao() {
    let conexao
    try {
        conexao = await pool.getConnection()
        await conexao.query('select 1')
        console.log('Conexão com Mysql OK!')
    } catch (erro) {
        console.error('Erro no mysql', erro.message)
    } finally {
        conexao?.release()
    }
}

module.exports = { pool, testarConexao }