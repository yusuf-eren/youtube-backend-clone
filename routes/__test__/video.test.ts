import request from 'supertest';
import { app } from '../../app';

it('create a video', async () => {
    const userCookie = await signup();

    // Error without title
    await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            description: 'WOOOOOOOO!',
        })
        .expect(403);

    await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey! Welcome to Youtube!',
        })
        .expect(201);

    await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey! Welcome to Youtube!',
            description: 'WOOOOOOOO',
        })
        .expect(201);
});

it('update a video', async () => {
    const userCookie = await signup();

    const video = await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey yoo',
        })
        .expect(201);

    await request(app)
        .patch(`/video/${video.body.url}`)
        .set('Cookie', userCookie)
        .send({
            title: 'Heyo',
            description: "I'm updated guys!!!!",
        })
        .expect(200);
});

it('delete a video', async () => {
    const userCookie = await signup();

    const video = await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey yoo',
        })
        .expect(201);

    await request(app)
        .delete(`/video/${video.body.url}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(200);
});

it('like a video', async () => {
    const userCookie = await signup();

    const video = await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey yoo',
        })
        .expect(201);

    await request(app)
        .get(`/video/${video.body.url}/like`)
        .set('Cookie', userCookie)
        .expect(200);

    // Can not like again
    await request(app)
        .get(`/video/${video.body.url}/like`)
        .set('Cookie', userCookie)
        .expect(400);
});

it('dislike a video', async () => {
    const userCookie = await signup();

    const video = await request(app)
        .post('/video/upload')
        .set('Cookie', userCookie)
        .send({
            title: 'Hey yoo',
        })
        .expect(201);

    await request(app)
        .get(`/video/${video.body.url}/dislike`)
        .set('Cookie', userCookie)
        .expect(200);

    // Can not like again
    await request(app)
        .get(`/video/${video.body.url}/dislike`)
        .set('Cookie', userCookie)
        .expect(400);
});
