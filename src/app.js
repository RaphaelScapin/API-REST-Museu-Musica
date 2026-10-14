require('dotenv').config()
const express = require('express')
const path = require('path')
const exposicaoRoutes = require('./routes/exposicao.routes')
const visitanteRoutes = require('./routes/visitante.routes')
const agendamentoRoutes = require('./routes/agendamento.routes')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/museu', (req, res)=> {
    res.json({
        mensagem: 'API REST museu da música',
        versao: '1.0.0'
    })
})

app.use('/museu/exposicao', exposicaoRoutes)
app.use('/museu/visitante', visitanteRoutes)
app.use('/museu/agendamento', agendamentoRoutes)
app.use((req, res)=> {
    res.status(404).json({
        erro: 'Rota não encontrada'
    })
})

module.exports = app