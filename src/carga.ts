import request from 'supertest';
import app from './app';

describe("Teste de Carga", () => {
    it('Deve lidar com um grande número de solicitações', async () => {
        const requestPromises: Promise<any>[] = [];
        const requestCount = 100; // Altere o número conforme desejado

        // Crie um loop para enviar várias solicitações
        for (let i = 0; i < requestCount; i++) {
            // Adicione cada solicitação à matriz de promessas
            requestPromises.push(request(app).get('/comics'));
        }

        // Espere até que todas as solicitações sejam concluídas
        const responses = await Promise.all(requestPromises);

        // Verifique se todas as respostas têm status 200
        responses.forEach(response => {
            expect(response.status).toBe(200);
        });
    });
});