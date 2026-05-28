const mongoose = require('mongoose');

const requiredMessage = 'El campo {PATH} es obligatorio.';
const minlengthMessage = 'El campo {PATH} debe tener al menos {MINLENGTH} caracteres.';
const maxlengthMessage = 'El campo {PATH} debe tener como máximo {MAXLENGTH} caracteres.';
const urlMessage = 'El campo {PATH} debe ser una URL válida.';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, requiredMessage],
    minlength: [2, minlengthMessage],
    maxlength: [30, maxlengthMessage],
  },
  about: {
    type: String,
    required: [true, requiredMessage],
    minlength: [2, minlengthMessage],
    maxlength: [30, maxlengthMessage],
  },
  avatar: {
    type: String,
    required: [true, requiredMessage],
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)?/.test(v);
      },
      message: urlMessage,
    },
  },
});

module.exports = mongoose.model('user', userSchema);