const express = require('express');
const authenticate = require('../authenticate');

const dishRouter = express.Router();

const {
    allAction,
    getDishes,
    addDish,
    deleteDishes,
    getDish,
    updateDish,
    deleteDish,
    getDishComments,
    addDishComment,
    deleteDishComments,
    getDishComment,
    updateDishComment,
    deleteDishComment
} = require('../dao/dishes');

dishRouter.route('/')
.all(allAction)
.get(getDishes)
.post(authenticate.verifyUser, addDish)
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(authenticate.verifyUser, deleteDishes);

dishRouter.route('/:dishId')
.get(getDish)
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put(authenticate.verifyUser, updateDish)
.delete(authenticate.verifyUser, deleteDish);

dishRouter.route('/:dishId/comments')
.get(getDishComments)
.post(authenticate.verifyUser, addDishComment)
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/' + req.params.dishId + '/comments');
})
.delete(authenticate.verifyUser, deleteDishComments);

dishRouter.route('/:dishId/comments/:commentId')
.get(getDishComment)
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})
.put(authenticate.verifyUser, updateDishComment)
.delete(authenticate.verifyUser, deleteDishComment);

module.exports = dishRouter;