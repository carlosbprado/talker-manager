const validationEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (!email) {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = {
    validationEmail,
};