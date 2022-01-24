const models = require('../models');

const allAction = (req,res,next) => {
    res.statusCode = 200;
    next();
}

const getFavorites = async (req,res,next) => {
    try {
        const favorites = await models.Favorite.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });

        res.setHeader('Content-Type', 'application/json');
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

        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }
    catch(error) {
        next(error);
    }
}

const getFavorite = async (req,res,next) => {
    const favorites = await models.Favorite.findOne({
        where: {
            userId: req.user.dataValues.id,
            dishId: req.params.dishId
        }
    });
    if (!favorites) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({"exists": false, "favorites": favorites});
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({"exists": true, "favorites": favorites});
    }
}

const deleteFavorites = async (req, res, next) => {
    try {
        await models.Favorite.destroy({
            where: {}
        });

        res.setHeader('Content-Type', 'text/plain');
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
        
        res.setHeader('Content-Type', 'application/json');
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
    getFavorite,
    deleteFavorites,
    deleteFavorite
}