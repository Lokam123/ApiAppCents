const mongoose = require('mongoose')
const userModel = require('../models/user')
const receitaModel = require('../models/receita')
const despesaModel = require('../models/despesa')

const userViewModel = mongoose.model('users', userModel);
const receitaViewModel = mongoose.model('receitas', receitaModel);
const despesaViewModel = mongoose.model('despesas', despesaModel);

module.exports = {
    userViewModel,
    receitaViewModel,
    despesaViewModel
}