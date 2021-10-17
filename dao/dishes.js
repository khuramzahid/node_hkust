const models = require('../models');

const allAction = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}

const getDishes = async (req,res,next) => {
    try {
        const dishes = await models.Dish.findAll({});
        res.json(dishes);
    }
    catch(error) {
        next(error);
    }
}

const addDish = async (req, res, next) => {
    try {
        let {
            name,
            image,
            category,
            label,
            price,
            featured,
            description,
            comments
        } = req.body;

        const insertedDish = await models.Dish.create({
            name,
            image,
            category,
            label,
            price,
            featured,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { returning: true });

        comments = comments.map(comment => {
            return {
                ...comment,
                dishId: insertedDish.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const insertedComments = await models.Comment.bulkCreate(
            comments, 
            { returning: true }
        );
        
        res.end('Added dish: ' + insertedDish.id);
    }
    catch(error) {
        next(error);
    }
}

const deleteDishes = async (req, res, next) => {
    try {
        await models.Dish.destroy({
            where: {}
        });
        await models.Comment.destroy({
            where: {}
        });
        res.end('Deleted all dishes.');
    }
    catch(error) {
        next(error);
    }
}

const getDish = async (req,res,next) => {
    try {
        const dish = await models.Dish.findOne({
            where: {
                id: req.params.dishId
            }
        });
        const comments = await models.Comment.findAll({
            where: {
                dishId: req.params.dishId
            }
        })
        res.json({
            dish,
            comments
        });
    }
    catch(error) {
        next(error);
    }
}

const updateDish = async (req, res, next) => {
    try {
        let {
            name,
            image,
            category,
            label,
            price,
            featured,
            description
        } = req.body;

        const insertedDish = await models.Dish.update({
            name,
            image,
            category,
            label,
            price,
            featured,
            description,
            updatedAt: new Date()
        }, { 
            where: { id: req.params.dishId },
            returning: true,
            plain: true
        });

        res.end('Updated dish: ' + req.params.dishId);
    }
    catch(error) {
        next(error);
    }
}

const deleteDish = async (req, res, next) => {
    try {
        await models.Dish.destroy({
            where: {
                id: req.params.dishId
            }
        });
        await models.Comment.destroy({
            where: {
                dishId: req.params.dishId
            }
        });
        res.end('Deleted dish: ' + req.params.dishId);
    }
    catch(error) {
        next(error);
    }
}

const getDishComments = async (req,res,next) => {
    try {
        const comments = await models.Comment.findAll({
            where: {
                dishId: req.params.dishId
            }
        });
        res.json(comments);
    }
    catch(error) {
        next(error);
    }
}

const addDishComment = async (req, res, next) => {
    try {
        let {
            rating,
            comment,
            author
        } = req.body;

        const insertedComment = await models.Comment.create({
            dishId: req.params.dishId,
            rating,
            comment,
            author,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { returning: true });
        
        res.end('Added comment: ' + insertedComment.id);
    }
    catch(error) {
        next(error);
    }
}

const deleteDishComments = async (req, res, next) => {
    try {
        await models.Comment.destroy({
            where: {
                dishId: req.params.dishId
            }
        });
        res.end('Deleted all comments for dish Id: ' + req.params.dishId);
    }
    catch(error) {
        next(error);
    }
}

const getDishComment = async (req,res,next) => {
    try {
        const comment = await models.Comment.findOne({
            where: {
                dishId: req.params.dishId,
                id: req.params.commentId
            }
        })
        res.json({
            comment
        });
    }
    catch(error) {
        next(error);
    }
}

const updateDishComment = async (req, res, next) => {
    try {
        let {
            rating,
            comment,
            author
        } = req.body;

        const insertedComment = await models.Comment.update({
            rating,
            comment,
            author,
            updatedAt: new Date()
        }, { 
            where: { 
                id: req.params.commentId,
                dishId: req.params.dishId
             },
            returning: true,
            plain: true
        });

        res.end('Updated dish comment: ' + req.params.commentId);
    }
    catch(error) {
        next(error);
    }
}

const deleteDishComment = async (req, res, next) => {
    try {
        await models.Comment.destroy({
            where: {
                dishId: req.params.dishId,
                id: req.params.commentId
            }
        });
        res.end('Deleted comment: ' + req.params.commentId);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
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
}