const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //acoplando o modulo de rotas nas variavel routes

routes.post('/sessions', SessionController.create); //criando uma seção fazendo login, logo, utilizamos post. Nao vamos colocar nada no bd

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); //rota raíz do node, com uma função com 2 parametros

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete); //é necessario colocar o id do caso q sera deletado

//para deixar as rotas acessiveis por outros arquivos, exportamos essas rotas:
module.exports = routes; //assim exportamos uma variavel de dentro de um arquivo em node