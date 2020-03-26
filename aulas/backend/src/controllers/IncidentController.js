const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const incidents = await connection('incidents').select('*');
        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        //request.headers; //o cabeçalho guarda informações do contexto da requisição
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            //vai inserir os dados com (colunas do bd):
            title,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },
    async delete(request, response) {
        const {id} = request.params; //pegar o id da ong que sera deletada
        const ong_id = request.headers.authorization; //pega o id da ong logada
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'}); //status nao autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //stts coom retorno de resposta sem conteudo mas com sucesso 
    }
};