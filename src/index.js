const express = require('express');
const { readTalkerData, readTalkerId } = require('./utils/fsUtil');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await readTalkerId(id);
  if (!talkerId) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
