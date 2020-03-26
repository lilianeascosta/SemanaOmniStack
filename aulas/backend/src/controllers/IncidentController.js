const connection = require('../database/connection');

module.exports = { //exportando um objeto
    async index(request, response){
        const {page = 1} = request.query; //se o page nao existir o padrão será 1

        const [count] = await connection('incidents').count();//retorna quantos incidents existem

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//fazendo uniao de duas tabelas pra poder retornar oss dados da ong
            .limit(5) //limitando o retorno da pagina para 5 incidentes, 5 em cada pagina
            .offset((page - 1) * 5) //caso esteja na pagina 1 
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); //todos dados de incidents e alguns de ong
        
        response.header('X-total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //no request.headers é de onde pegamos de fato o id logado

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

        await connection('incidents').where('id', id).delete(); //deleta o registro de dentro da tabela do bd

        return response.status(204).send(); //stts com retorno de resposta sem conteudo mas com sucesso 
    }
};