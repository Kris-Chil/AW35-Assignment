var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const EncodeJWT = (id, username) => {
  try {
    token = jwt.sign({ id: id, username: username }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    return token;
  } catch (err) {
    return res.jsend.error({
      statusCode: 400,
      result: 'Something went wrong when creating JWT token',
    });
  }
};

module.exports = router;
