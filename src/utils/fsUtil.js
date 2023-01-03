const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const talker = JSON.parse(data);
    return talker;
} catch (error) {
    console.log('Nao consigo ler o arquivo');
}
}

async function readTalkerId(id) {
    try {
        const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
        const talkers = JSON.parse(data);
        const talker = talkers.find((t) => t.id === Number(id));
        return talker;
    } catch (error) {
        console.log('id nao encontrado');
    }
}

module.exports = {
    readTalkerId,
    readTalkerData,
};