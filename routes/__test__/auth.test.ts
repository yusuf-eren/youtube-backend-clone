import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return await request(app)
        .post('/auth/signup')
        .send({
            name: 'Yusuf Eren',
            email: 'erenyusuf170@gmail.com',
            password: 'password124',
        })
        .expect(201);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/auth/signup')
        .send({
            name: 'Test',
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/auth/signin')
        .send({
            email: 'test@test.com',
            password: 'password2',
        })
        .expect(400);
});

it('clear cookie when signed out', async () => {
    await request(app)
        .post('/auth/signup')
        .send({
            name: 'Test',
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/auth/signin')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(200);

    const response = await request(app).get('/auth/signout').send();
    const cookies = response.headers['set-cookie'][0].split(',').map((item:any) => item.split(';')[0])[0]
    expect(cookies.length).toEqual(13);
});

it('can not signout when the user is not logged in', async () => {
    const response = await request(app)
        .get('/auth/signout')
        .send()
        .expect(200);
    console.log(response)
});
