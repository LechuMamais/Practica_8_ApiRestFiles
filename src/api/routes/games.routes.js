const GameRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { isAdmin } = require('../../middlewares/isAdmin.middleware');
const { getGameById, getGames, createGame, updateGame, deleteGame } = require('../controllers/games.controller');

GameRoutes.get('/:id', [isAuth, isAdmin], getGameById);
GameRoutes.get('/', [isAuth, isAdmin], getGames);
GameRoutes.post('/', [isAuth, isAdmin] , createGame);
GameRoutes.put('/:id', [isAuth, isAdmin] , updateGame);
GameRoutes.delete('/:id', [isAuth, isAdmin] , deleteGame);

module.exports = GameRoutes;