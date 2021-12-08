const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

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
.post(addDish)
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(deleteDishes);

dishRouter.route('/:dishId')
.get(getDish)
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put(updateDish)
.delete(deleteDish);

dishRouter.route('/:dishId/comments')
.get(getDishComments)
.post(addDishComment)
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/' + req.params.dishId + '/comments');
})
.delete(deleteDishComments);

dishRouter.route('/:dishId/comments/:commentId')
.get(getDishComment)
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})
.put(updateDishComment)
.delete(deleteDishComment);

module.exports = dishRouter;