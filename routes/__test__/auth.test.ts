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

    const response = await request(app).post('/auth/signout').send();
    const cookie = response.get('Set-Cookie');
    expect(cookie).toBeUndefined();
});
