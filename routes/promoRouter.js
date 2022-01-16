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
.post(authenticate.verifyUser, authenticate.verifyAdmin, addPromotion)
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deletePromotions);

promoRouter.route('/:promoId')
.get(getPromotion)
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, updatePromotion)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deletePromotion);

module.exports = promoRouter;