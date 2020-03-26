const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router(); //acoplando o modulo de rotas nas variavel routes

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); //rota raíz do node, com uma função com 2 parametros

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//para deixar as rotas acessiveis por outros arquivos, exportamos essas rotas:
module.exports = routes; //assim exportamos uma variavel de dentro de um arquivo em node