const User = require('../models/user');
const Card = require('../models/card');

const handlerError = () => {
  const error = new Error('Usuario no encontrado');
  error.statusCode = 404;
  throw error;
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Error del servidor',
      });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => handlerError())
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({
          message: err.message || 'Error interno del servidor',
        });
      }
    });
};

const createUser = (req, res) => {
  console.log('BODY RECIBIDO:', req.body);
  console.log('TIPO:', typeof req.body);

  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log('ERROR REAL:', err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({
        message: err.message,
      });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true }
  )
    .orFail(() => handlerError())
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({
          message: err.message || 'Error interno del servidor',
        });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => handlerError())
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({
          message: err.message || 'Error interno del servidor',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};