const crypto = require('crypto');
const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);

async function isAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ result: 'Authorization required' });
    }

    try {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const dbUser = await userService.getOne(username);
        if (!dbUser) {
            return res.status(401).json({ result: 'Invalid username or password' });
        }

        crypto.pbkdf2(password, dbUser.dataValues.Salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err || !crypto.timingSafeEqual(dbUser.dataValues.EncryptedPassword, hashedPassword)) {
                return res.status(401).json({ result: 'Invalid username or password' });
            }
            
            req.user = { id: dbUser.dataValues.Id, username: dbUser.dataValues.Username };
            next();
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error during authentication' });
    }
}

module.exports = { isAuth };