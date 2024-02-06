const { deleteImgCloudinary } = require('../../utils/deletefile.cloudinary');
const Game = require('../models/games.model');

const getGames = async (req, res, next) =>  {
    try {
        const games = await Game.find();
        return res.status(200).json(games);
    } catch (error) {
        return next(error);
    }
}

const getGameById = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);
        return res.status(200).json(game);
    } catch (error) {
        return next(error);
    }
}

const createGame = async (req, res, next) => {
    try {
        const newGame = new Game({
            ...req.body,
            img: req.file ? req.file.path : 'not image'
        })
        const game = await newGame.save( )
        return res.status(201).json(game);
    } catch (error) {
        return next(error);
    }
}

const updateGame = async (req, res, next) => {
    try {
        const {id} = req.params;
        const newGame = await new Game({
            ...req.body,
            img: req.file ? req.file.path : 'not image'
        });
        newGame._id = id;
        const gameUpdated = await Game.findByIdAndUpdate(id, newGame, {new: true});
        return res.status(200).json(gameUpdated);
    } catch (error) {
        return next(error);
    }
}

const deleteGame = async (req, res, next) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (game.img) {deleteImgCloudinary(game.img)}
        return res.status(200).json(game);
    } catch (error) {
        return next(error);
    }
}

module.exports = { getGames, getGameById, createGame, updateGame, deleteGame };