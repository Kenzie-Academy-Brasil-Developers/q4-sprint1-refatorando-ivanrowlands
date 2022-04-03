import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../app';

const company = {
    name: 'Carne de Jaca',
    password: 'processo2010',
    cep: '04243165',
    address: 'Rua Lucio Pery',
    number: '29',
    state: 'SP',
    city: 'São Paulo',
};

const resp = {
    error: 'Campo de cnpj obrigátorio',
};

describe('Yup Test', () => {
    it('Should not be able to create a company without cnpj', async () =>{
        const response = await (await request(app).post('/companies/register')).setEncoding(company);

        expect(response.statusCode).toBe(400);
        expect (response.body).toStrictEqual(resp);
    });
});