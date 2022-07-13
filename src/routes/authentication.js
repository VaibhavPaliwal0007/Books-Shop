const express = require('express');

const routerLogin = new express.Router();

const { login } = require('../controllers/authentication');

routerLogin.post("/api/v1/login", login);

module.exports = routerLogin;

