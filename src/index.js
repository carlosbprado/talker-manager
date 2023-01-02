const express = require('express');
const { readTalkerData } = require('./utils/fsUtil');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const registeredTalkers = await readTalkerData();
  if (!registeredTalkers) {
    return res.status(200).json([]);
  }
  return res.status(200).json(registeredTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
