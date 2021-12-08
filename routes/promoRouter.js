const express = require('express');

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
.post(addPromotion)
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(deletePromotions);

promoRouter.route('/:promoId')
.get(getPromotion)
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(updatePromotion)
.delete(deletePromotion);

module.exports = promoRouter;