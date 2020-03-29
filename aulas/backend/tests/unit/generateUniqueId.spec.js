const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    //it porque os testes são sempre em formato de texto, para depois sabermos qual teste falhou.
    it('should generate an unique ID', () => {
        //aqui vamos fazer os testes
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    }) 
});