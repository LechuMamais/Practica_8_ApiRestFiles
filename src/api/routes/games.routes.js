const GameRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { upload } = require('../../middlewares/uploadfiles.middleware');
const { isAdmin } = require('../../middlewares/isAdmin.middleware');
const { getGameById, getGames, createGame, updateGame, deleteGame } = require('../controllers/games.controller');

GameRoutes.get('/:id', getGameById);
GameRoutes.get('/', getGames);
GameRoutes.post('/', [isAuth, isAdmin] , upload.single('img') , createGame);
GameRoutes.put('/:id', [isAuth, isAdmin] , upload.single('img') , updateGame);
GameRoutes.delete('/:id', [isAuth, isAdmin] , deleteGame);

module.exports = GameRoutes;