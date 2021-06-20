const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)


test('should sign up a user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Luffy',
        email: 'luffy@abc.com',
        password: 'onepiece'
    }).expect(200)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull(


    )
})


test('should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'sanji@abc.com',
        password: 'onepiece'
    }).expect(400)
})


test('should get the profile for user', async() => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for unauthenticated user', async() => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})


test('should delete authorized account', async() => {
    const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(500)
    //Assertion: db does not contain the user anymore
    const user = User.findById(userOneId)
    expect(user).toBeNull
})

test('should not delete unauthorized account', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar image', async() => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    expect(200)
})


test('should update valid user fields', async() => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Jess'
    })
    .expect(200)

    const user = await User.findById(userOne)
    expect(user.name).toBe('Jess')
})

test('should not update invalid user fields', async() => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Jaipur'
    })
    .expect(400)
})