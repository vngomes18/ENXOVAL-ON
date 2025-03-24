const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Rotas para itens do enxoval
router.post('/', itemController.criarItem);
router.get('/', itemController.listarItens);
router.get('/:id', itemController.buscarItem);
router.put('/:id', itemController.atualizarItem);
router.delete('/:id', itemController.deletarItem);

module.exports = router; 