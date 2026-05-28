const express = require('express');
const path = require('path');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

// Middleware para leer JSON (CORRECTO)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Archivos estáticos (si tienes frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware temporal de usuario
app.use((req, res, next) => {
  req.user = {
    _id: '67c3a6fbb80569b215292512',
  };
  next();
});

// 🚨 RUTAS CORREGIDAS (ESTO ES LO IMPORTANTE)
app.use('/users', routesUsers);
app.use('/cards', routesCards);

// Error handler (debe ir al final)
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Error interno del servidor',
  });
};

app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});