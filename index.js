const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database.json');

const app = express();
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (=>) - Nome: Arrow function
// (): Parenteses, []: colchete, {}: chave
// req = requisição, res = resposta
app.get('/texto', (req, res)=>{
    res.status(200).send('Solicitado com sucesso')
})

app.get('/xml', (req, res)=>{
    res.status(200).send('<mensagem>Solicitado com sucesso</mensagem>')
})

app.get('/json', (req, res)=>{
    res.status(200).send({mensagem: 'Solicitado com sucesso'})
})

app.get("/acesso", (req,res)=>{
    const {id} = req.query;
    if(id) {
        const resposta = database.acesso.some(e=> e.id == id) ?
        database.acesso.find(e=> e.id == id) : null;

        res.status(resposta ? 200 : 404).send(resposta)
    } else {
        res.status(200).send(database.acesso)
    }
})

app.post('/acesso',(req,res)=>{
    const {acesso} = req.body;

    database.acesso.push(acesso)
    res.status(200).send(database.acesso)
})

app.delete("/acesso",(req,res)=>{
    res.status(200).send('logado com sucesso')
})

app.put('/acesso',(req,res)=>{
    res.status(200).send('logado com sucesso')
})


app.listen(3000, () => {
    console.log('Server is up and running on port numner ' + 3000);
});