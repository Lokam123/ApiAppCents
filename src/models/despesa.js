const mongoose = require('mongoose');


const despesaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Nome do modelo referenciado
        required: true
    },
    descricao: {
        type: String,
    },
    categoria: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },

}, {
    collection: 'minhas_despesas'
});

module.exports = despesaSchema;