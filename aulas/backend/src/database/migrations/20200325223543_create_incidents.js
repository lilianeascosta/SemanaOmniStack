
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        //campos da tabela ong:
        table.increments(); //cria uma chave primaria por incident
        table.string('title').notNullable(); //atributo nao nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //relacionamento com a tabela ong

        table.foreign('ong_id').references('id').inTable('ongs'); //cria a fk ligando ong_id de incident com id de ong
    } );
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
