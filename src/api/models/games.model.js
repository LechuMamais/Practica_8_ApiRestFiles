const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true, unique: true },
    anoLanzamiento: { type: Number, trim: true, required: true },
    descripcion: { type: String, trim: true, required: true },
    img: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('games', gameSchema)
module.exports = Game