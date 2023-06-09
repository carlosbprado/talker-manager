const validationName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validationAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    }
    if (age < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }

    next();
};

const validationTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    next();
};

const validationwatchedAt = (req, res, next) => {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    const { watchedAt } = req.body.talk;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!regex.test(watchedAt)) {
        return res.status(400).json({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validationRate = (req, res, next) => {
    const { rate } = req.body.talk;
    if (rate === undefined) {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    next();
};

module.exports = {
    validationName,
    validationAge,
    validationTalk,
    validationwatchedAt,
    validationRate,
};