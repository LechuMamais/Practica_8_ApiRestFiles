const mongoose = require('mongoose')

const consolaSchema = new mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true, unique: true },
    year: { type: Number, trim: true, required: true },
    descripcion: { type: String, trim: true, required: true },
    img: { type: String, trim: true, required: true },
    juegosDisponibles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games'
      }],
  },
  {
    timestamps: true,
  }
);

const Consola = mongoose.model('consolas', consolaSchema)
module.exports = Consola