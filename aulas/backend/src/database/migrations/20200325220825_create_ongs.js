//método responsável pela criação da tabela:
exports.up = function(knex) { 
    return knex.schema.createTable('ongs', function (table) {
        //campos da tabela ong:
        table.string('id').primary();       //chave primaria
        table.string('name').notNullable(); //atributo nao nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // o segundo parametro representa o tamanho da variavel
    } );
};

//se der algum problema e precisar voltar atras
exports.down = function(knex) {
  //deleta a tabela
  return knex.schema.dropTable('ongs'); 
};
