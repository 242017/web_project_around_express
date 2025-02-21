const cards = require('express').Router();
const fs = require('fs');
const path = require('path');

// Ruta absoluta para el archivo cards.json
const cardsFilePath = path.join(__dirname, '../data/cards.json');

// Manejador para obtener todas las cards
cards.get('/cards', (req, res) => {
  fs.readFile(cardsFilePath, (err, data) => {
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

// Manejador para obtener una card por su ID
cards.get('/cards/:id', (req, res) => {
  fs.readFile(cardsFilePath, (err, data) => {
    const cards = JSON.parse(data);
    const card = cards.find(c => c._id === req.params.id);
    if (!card) {
      return res.send({ message: 'ID de tarjeta no encontrado' });
    }
    res.send(card);
  });
});

module.exports = cards;