const mongoose = require('mongoose');

const UsuariSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  cognoms: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  data_naixement: {
    type: Date,
    required: true
  },
  contrasenya: {
    type: String,
    required: true
  },
  idiomes: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.every((code) => /^[a-z]{2}$/.test(code)); // Validar codis ISO 639-1
      },
      message: "Tots els idiomes han de ser codis ISO 639-1 vàlids (ex: 'ca', 'es')."
    }
  }
}, {
  timestamps: true // Afegeix createdAt i updatedAt automàticament
});

const Usuari = mongoose.model('Usuari', UsuariSchema);

module.exports = Usuari;
