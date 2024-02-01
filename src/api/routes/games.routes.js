const GameRoutes = require('express').Router();
const { isAdmin } = require('../../middlewares/isAdmin.middleware');
const { getGameById, getGames, createGame, updateGame, deleteGame } = require('../controllers/games.controller');

GameRoutes.post('/:id', getGameById);
GameRoutes.get('/', getGames);
GameRoutes.post('/', [isAdmin] , createGame);
GameRoutes.put('/:id', [isAdmin] , updateGame);
GameRoutes.delete('/:id', [isAdmin] , deleteGame);

module.exports = GameRoutes;