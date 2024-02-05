const Consola = require('../models/consolas.model');

const getConsolas = async (req, res, next) =>  {
    try {
        const consolas = await Consola.find();
        return res.status(200).json(consolas);
    } catch (error) {
        return next(error);
    }
}

const getConsolaById = async (req, res, next) => {
    try {
        const consola = await Consola.findById(req.params.id);
        return res.status(200).json(consola);
    } catch (error) {
        return next(error);
    }
}

const createConsola = async (req, res, next) => {
    try {
        const newConsola = new Consola({
            ...req.body,
            img: req.file ? req.file.path : 'not image',
            })
        const consola = await newConsola.save( )
        return res.status(201).json(consola);
    } catch (error) {
        return next(error);
    }
}

const updateConsola = async (req, res, next) => {
    try {
        const {id} = req.params;
        const newConsola = await new Consola(req.body);
        newConsola._id = id;
        const consolaUpdated = await Consola.findByIdAndUpdate(id,
            {...req.body, imagen: req.file ? req.file.path : 'not image'},
            {new: true});
        return res.status(200).json(consolaUpdated);
    } catch (error) {
        return next(error);
    }
}

const deleteConsola = async (req, res, next) => {
    try {
        const consola = await Consola.findByIdAndDelete(req.params.id);
        if (consola.imagen) deleteImgCloudinary(consola.imagen)
        return res.status(200).json(consola);
    } catch (error) {
        return next(error);
    }
}

module.exports = { getConsolas, getConsolaById, createConsola, updateConsola, deleteConsola };