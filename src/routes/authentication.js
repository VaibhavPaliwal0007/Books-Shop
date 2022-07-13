const express = require('express');

const authenticateRoute = new express.Router();

const auth = require('../middleware/auth');
const { login, logout, updateCredentials, signup } = require('../controllers/authentication');

authenticateRoute.post("/login", login);
authenticateRoute.post("/logout", auth, logout);
authenticateRoute.patch("/update-credentials", auth, updateCredentials);
authenticateRoute.post("/signup", signup);

module.exports = authenticateRoute;

