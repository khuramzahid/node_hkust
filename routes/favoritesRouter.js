const express = require('express');
var authenticate = require('../authenticate');
const cors = require('./cors');
const favoritesRouter = express.Router();

const {
    allAction,
    getFavorites,
    addFavorite,
    getFavorite,
    deleteFavorites,
    deleteFavorite
} = require('../dao/favorites');

favoritesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(allAction)
.get(cors.corsWithOptions, authenticate.verifyUser, getFavorites)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, addFavorite)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, deleteFavorites);

favoritesRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, getFavorite)
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites/'+ req.params.dishId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'+ req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, deleteFavorite);

module.exports = favoritesRouter;