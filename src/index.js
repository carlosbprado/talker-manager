const express = require('express');
const { readTalkerData, readTalkerId, generateToken } = require('./utils/fsUtil');

const app = express();
app.use(express.json());

const HTTP_NOT_FOUND = 404;
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const registeredTalkers = await readTalkerData();
  if (!registeredTalkers) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(registeredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await readTalkerId(id);
  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post('/login', async (req, res) => res.status(HTTP_OK_STATUS).json({ token: generateToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
