import { describe, expect, it} from '@jest/globals';
import request from 'supertest';
import app from '../app';

const resp = {message: 'Missing authorization'};

describe('Authenticate Test', () => {
    it('Should return missing authorization', async () => {
        const response = await request(app).delete('/companies/63453131464');

        expect(response.statusCode).toBe(401);
        expect(response.body).toStrictEqual(resp);
    });
});