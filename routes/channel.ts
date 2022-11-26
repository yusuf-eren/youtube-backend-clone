import express from 'express';
import { subscribeChannel, unsubscribeChannel } from '../controllers/channel';
const app = express();

app.route('/subscribe/:channelId').post(subscribeChannel).delete(unsubscribeChannel);

export { app as channelRoute };
