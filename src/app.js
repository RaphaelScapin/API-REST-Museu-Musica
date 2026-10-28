require('dotenv').config()
const express = require('express')
const path = require('path')
const exposicaoRoutes = require('./routes/exposicao.routes')
const visitanteRoutes = require('./routes/visitante.routes')
const agendamentoRoutes = require('./routes/agendamento.routes')
const salaRoutes = require('./routes/sala.routes')
const partituraRoutes = require('./routes/partitura.routes')
const tipoInstrumentoRoutes = require('./routes/tipo_instrumento.routes')
const eventoRoutes = require('./routes/evento.routes')

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
app.use('/museu/sala', salaRoutes)
app.use('/museu/partitura', partituraRoutes)
app.use('/museu/tipo_instrumento', tipoInstrumentoRoutes)
app.use('/museu/evento', eventoRoutes)
app.use((req, res)=> {
    res.status(404).json({
        erro: 'Rota não encontrada'
    })
})

module.exports = app