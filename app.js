const express = require('express');
const fs = require('fs');
const path = require('path');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const app = express();

const { PORT = 3000 } = process.env;

const errorHandler = (req, res, next) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
};

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routesUsers);
app.use('/', routesCards);
// Middleware para rutas no encontradas
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});