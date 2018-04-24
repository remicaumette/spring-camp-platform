const request = require('supertest');
const app = require('../src/app');
const { assert } = require('chai');

describe('Auth', () => {
    before(() => request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send({ email: 'test3@test.fr', username: 'Test3', password: 'testtest' })
        .expect(201, {}));

    describe('POST /auth/login', () => {
        it('should return a token', () => request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ email: 'test3@test.fr', password: 'testtest' })
            .expect(200)
            .then((res) => {
                assert.isNotNull(res.body.token);
            }));

        it('should return an error', () => request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ email: 'test4@test.fr', password: 'test' })
            .expect(403, { error: 'Invalid email or password.' }));
    });
});
