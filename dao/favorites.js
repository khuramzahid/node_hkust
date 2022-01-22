const models = require('../models');

const allAction = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
}

const getFavorites = async (req,res,next) => {
    try {
        const favorites = await models.Favorite.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });
        res.json(favorites);
    }
    catch(error) {
        next(error);
    }
}

const addFavorite = async (req, res, next) => {
    try {
        let {
            dishId
        } = req.body;

        await models.Favorite.create({
            userId: req.user.dataValues.id,
            dishId
        });

        const favorites = await models.Favorite.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });
        
        res.json(favorites);
    }
    catch(error) {
        next(error);
    }
}

const deleteFavorites = async (req, res, next) => {
    try {
        await models.Favorite.destroy({
            where: {}
        });
        res.json('Deleted all Favorites.');
    }
    catch(error) {
        next(error);
    }
}

const deleteFavorite = async (req, res, next) => {
    try {
        await models.Favorite.destroy({
            where: {
                userId: req.user.dataValues.id,
                dishId: req.params.dishId
            }
        });
        
        const favorites = await models.Favorite.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });
        
        res.json(favorites);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    allAction,
    getFavorites,
    addFavorite,
    deleteFavorites,
    deleteFavorite
}