const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //conexão de desenvolvimento

module.exports = connection;