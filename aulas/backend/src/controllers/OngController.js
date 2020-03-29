const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection'); //conexao com o banco

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            //coloca todas as colunas que quer inserir dentro da tabela
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({id});
    }
};