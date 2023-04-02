import supertest from 'supertest';
import {beforeEach, describe, expect, test} from '@jest/globals';
import {flushUsers} from '../../src/services/UserService'
const {app, start} = require('../../src/App')
const { createUserIT } = require('../helpers/ressources')

beforeEach(async() => {
    await start()
})
describe('UserRessources tests', () => {
    beforeEach(async () => flushUsers())
    test('create user', async() => {
        await supertest(app)
            .post('/api/users')
            .send({username: 'user1', password: '123'})
            .expect(201)
    })
    test('create same user should return 409', async() => {
        await supertest(app)
            .post('/api/users')
            .send({username: 'user1', password: '123'})
            .expect(201)

        await supertest(app)
            .post('/api/users')
            .send({username: 'user1', password: '123'})
            .expect(409)
    })
    test('login should return token', async () => {
        const user = await createUserIT()
        await supertest(app)
            .post('/api/users/login')
            .send({username: user.username, password: '123'})
            .expect(200)
            .expect(res => {
                expect(res.body.token).toBeDefined()
            })
    })

    test('login wrong should return error', async () => {
        const user = await createUserIT()
        return supertest(app)
            .post('/api/users/login')
            .send({username: user.username, password: '1234'})
            .expect(400)            
    })

    test('account give token', async () => {
        const user = await createUserIT()
        return supertest(app)
            .get('/api/users/account')
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200) 
            .expect(res => expect(res.body.username).toBe(user.username))           
    })
})

