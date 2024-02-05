const ConsolaRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { isAdmin } = require('../../middlewares/isAdmin.middleware');
const { upload } = require('../../middlewares/ficherosfiles.middleware')
const { getConsolaById, getConsolas, createConsola, updateConsola, deleteConsola } = require('../controllers/consolas.controller');

ConsolaRoutes.get('/:id', getConsolaById);
ConsolaRoutes.get('/', getConsolas);
ConsolaRoutes.post('/', [isAuth, isAdmin], upload.single('img') , createConsola);
ConsolaRoutes.put('/:id', [isAuth, isAdmin] , updateConsola);
ConsolaRoutes.delete('/:id', [isAuth, isAdmin] , deleteConsola);

module.exports = ConsolaRoutes;