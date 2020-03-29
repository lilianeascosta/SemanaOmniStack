const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //acoplando o modulo de rotas nas variavel routes

routes.post('/sessions', SessionController.create); //criando uma seção fazendo login, logo, utilizamos post. Nao vamos colocar nada no bd

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    //validando os body
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); //rota raíz do node, com uma função com 2 parametros

routes.get('/profile', celebrate({
    //autorização do header
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        value: Joi.number().required().min(2),
    })
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required,
    })
}), IncidentController.delete); //é necessario colocar o id do caso q sera deletado

//para deixar as rotas acessiveis por outros arquivos, exportamos essas rotas:
module.exports = routes; //assim exportamos uma variavel de dentro de um arquivo em node