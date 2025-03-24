const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Cozinha', 'Quarto', 'Banheiro', 'Sala', 'Outros']
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1
  },
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  comprado: {
    type: Boolean,
    default: false
  },
  prioridade: {
    type: String,
    enum: ['Alta', 'Média', 'Baixa'],
    default: 'Média'
  },
  observacoes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema); 