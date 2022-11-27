import request from 'supertest';
import { app } from '../../app';

it('subscribes to channel', async () => {
    const userCookie = await signup();
    const channel = await createChannel();
    await request(app)
        .post(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(200);
});

it('unsubscribes to channel', async () => {
    const userCookie = await signup();
    const channel = await createChannel();

    // Subscribe
    await request(app)
        .post(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(200);

    // Unsubscribe
    await request(app)
        .delete(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(200);
});

it('can not unsubscribe if user did not subscribed to channel', async () => {
    const userCookie = await signup();
    const channel = await createChannel();

    // Unsubscribe
    await request(app)
        .delete(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(400);
});

it('can not subscribe to channel if user already subscribed', async () => {
    const userCookie = await signup();
    const channel = await createChannel();
    await request(app)
        .post(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(200);

    await request(app)
        .post(`/channel/subscribe/${channel._body._id}`)
        .set('Cookie', userCookie)
        .send({})
        .expect(400);
});
