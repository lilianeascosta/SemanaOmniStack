const express = require('express'); //express é um pacote
const routes = require('./routes'); //importando o arquivo das rotas

const app = express(); //criando a aplicação, onde vai ter as rotas e toda a funcionalidade

//dizendo pro app que estamos utilizando json para as requisições
app.use(express.json());//antes de tds as requisições tem q converter esse json prum objeto JS
app.use(routes); //chama o arquivo de rotas

app.listen(3333); //quando coloca localhost:3333 abre nossa aplicação.