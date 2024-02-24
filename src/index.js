import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
