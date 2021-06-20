const request = require('supertest')
const Task = require('../src/models/tasks')
const app = require('../src/app')
const {
    userOneId, 
    userOne, 
    setupDatabase, 
    userTwo,
    taskOne,
    taskTwo,
    taskThree} = require('./fixtures/db')

beforeEach(setupDatabase)


test('should create task for user', async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my test'
    })
    .expect(200)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})


test('Should get user tasks', async() => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})


test('should not delete other users tasks', async() => {
    const reponse = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
    
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})






