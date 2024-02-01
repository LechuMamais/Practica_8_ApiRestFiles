const ConsolaRoutes = require('express').Router();
const { isAdmin } = require('../../middlewares/isAdmin.middleware');
const { getConsolaById, getConsolas, createConsola, updateConsola, deleteConsola } = require('../controllers/consolas.controller');

ConsolaRoutes.get('/:id', getConsolaById);
ConsolaRoutes.get('/', getConsolas);
ConsolaRoutes.post('/', [isAdmin] , createConsola);
ConsolaRoutes.put('/:id', [isAdmin] , updateConsola);
ConsolaRoutes.delete('/:id', [isAdmin] , deleteConsola);

module.exports = ConsolaRoutes;