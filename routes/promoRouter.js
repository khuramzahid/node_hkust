const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

const {
    authenticateToken
} = require('../auth');

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
.all(authenticateToken, allAction)
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