const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

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

async function writeNewtalker(newTalker) {
    try {
        const oldTalkers = await readTalkerData();
        const allTalkers = JSON.stringify([...oldTalkers, newTalker]);
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalkers);
    } catch (error) {
        console.error(error);
    }
}
async function deleteTalker(newTalker) {
    try {
        const oldTalkers = await readTalkerData();
        const allTalkers = JSON.stringify([oldTalkers, newTalker]);
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalkers);
    } catch (error) {
        console.error(error);
    }
}
const generateToken = () => 
    crypto.randomBytes(8).toString('hex');

module.exports = {
    readTalkerId,
    readTalkerData,
    generateToken,
    writeNewtalker,
    deleteTalker,
};