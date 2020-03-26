const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        //vai verificar se a ong realmente existe para poder validar a sessão
        const {id} = request.body;

        const ong = await connection('ongs') //buscando uma ong do banco de dados
            .where('id', id)
            .select('name')
            .first(); //para garantir que retorne somente uma ong

        if(!ong){
            return response.status(400).json({error: 'No ONG found with this ID'}); 
        }

        return response.json(ong);
    }
}