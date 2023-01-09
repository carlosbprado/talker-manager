const express = require('express');
const { readTalkerData, readTalkerId, generateToken, writeNewtalker } = require('./utils/fsUtil');
// const { writeTalker } = require('./utils/writeFile');
const { validationLogin } = require('./middlewares/validationLogin');
const { isAuth } = require('./middlewares/validationAuth');
const { validationName,
  validationAge,
  validationTalk,
  validationwatchedAt,
  validationRate,
} = require('./middlewares/validationTalker');

const app = express();
app.use(express.json());

// const TALKER_DATA_PATH = '../talker.json';
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

app.post('/login', validationLogin, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
isAuth,
validationName,
validationAge,
validationTalk,
validationwatchedAt,
validationRate,
async (req, res) => {
  try {
    const { body } = req;
    const talkers = await readTalkerData();
    const id = talkers.length + 1;
    const newTalker = { id, ...body };
    await writeNewtalker(newTalker);
    return res.status(201).json(
      newTalker,
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
