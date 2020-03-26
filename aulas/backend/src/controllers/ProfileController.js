//perfil de entidade de uma ong

const connection = require('../database/connection');

module.exports = {
    async index(request, response) { //retorna os casos especificos de uma unica ong
        const ong_id  = request.headers.authorization; //acessando o id da ong logada

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //esse where significa: ong_id == ong_id
            .select('*'); //seleciona todos os campos
        
        return response.json(incidents);
    }
}