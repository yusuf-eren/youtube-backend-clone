import express from 'express';
import dataRoute from './routes/data.js';
const app = express();

app.use('/data-route', dataRoute);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
