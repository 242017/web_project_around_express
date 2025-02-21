const users = require('express').Router();
const fs = require('fs');
const path = require('path');

// Ruta absoluta para el archivo users.json
const usersFilePath = path.join(__dirname, '../data/users.json');

// Manejador para obtener todos los usuarios
users.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

// Manejador para obtener un usuario por su ID
users.get('/users/:id', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    const users = JSON.parse(data);
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.send({ message: 'ID de usuario no encontrado' });
    }
    res.send(user);
  });
});

module.exports = users;
