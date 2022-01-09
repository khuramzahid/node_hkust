const express = require('express');
var authenticate = require('../authenticate');

const promoRouter = express.Router();

const {
    allAction,
    getPromotions,
    addPromotion,
    deletePromotions,
    getPromotion,
    updatePromotion,
    deletePromotion
} = require('../dao/promotions');

promoRouter.route('/')
.all(allAction)
.get(getPromotions)
.post(authenticate.verifyUser, addPromotion)
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, deletePromotions);

promoRouter.route('/:promoId')
.get(getPromotion)
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(authenticate.verifyUser, updatePromotion)
.delete(authenticate.verifyUser, deletePromotion);

module.exports = promoRouter;