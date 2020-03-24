const express = require('express');

const app = express(); //criando a aplicação, onde vai ter as rotas e toda a funcionalidade

app.get('/', (request, response) => {
    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Liliane Costa'
    });
}); //rota raíz do node, com uma função com 2 parametros

app.listen(3333); //quando coloca localhost:3333 abre nossa aplicação.