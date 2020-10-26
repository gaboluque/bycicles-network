/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const express = require('express');
const passport = require('../config/passport');
const Token = require('../models/Token');
const User = require('../models/User');

const sessionsRouter = express.Router();

sessionsRouter.get('/login', (req, res) => res.render('session/login'));
sessionsRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err1, user, info) => {
    if (err1) return next(err1);
    if (!user) return res.render('session/login', { info });
    req.logIn(user, (err2) => {
      if (err2) return next(err2);
      return res.redirect('/');
    });
  })(req, res, next);
});

sessionsRouter.get('/logout', (req, res) => {
  // passport
  req.logout();
  res.redirect('/');
});

sessionsRouter.get('/forgot-password', (req, res) => {
  res.render('session/forgotPassword');
});

sessionsRouter.post('/forgot-password', ({ body }, res) => {
  User.findOne({ email: body.email }, (err, user) => {
    if (!user)
      return res.render('session/forgotPassword', {
        info: { message: 'No existe un usuairo con ese correo' },
      });

    user.resetPassword();
    res.render('session/forgotPassword', {
      info: {
        message:
          'Si tu correo exite en nuestra DB, recibiras un correo para recuperar tu contraseña',
      },
    });
  });
});

sessionsRouter.get('/reset-password', ({ query }, res) => {
  Token.findOne({ token: query.token }, (err, token) => {
    if (!token) return res.redirect('/login');

    res.render('session/resetPassword', {
      token: query.token,
    });
  });
});

sessionsRouter.post('/reset-password', ({ body }, res) => {
  Token.findOne({ token: body.token }, (err, token) => {
    if (!token)
      return res.render('session/resetPassword', {
        info: { message: 'Token invalido' },
      });

    User.findById(token._userId, (err2, user) => {
      if (!user)
        return res.render('session/resetPassword', {
          info: { message: 'Usuario no encontrado' },
        });

      user.password = body.password;
      user.save(() => res.redirect('/login'));
    });
  });
});

module.exports = sessionsRouter;
