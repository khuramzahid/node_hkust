const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

const {
    authenticateToken
} = require('../auth');

const {
    allAction,
    getLeaders,
    addLeader,
    deleteLeaders,
    getLeader,
    updateLeader,
    deleteLeader
} = require('../dao/leaders');

leaderRouter.route('/')
.all(authenticateToken, allAction)
.get(getLeaders)
.post(addLeader)
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(deleteLeaders);

leaderRouter.route('/:leaderId')
.get(getLeader)
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put(updateLeader)
.delete(deleteLeader);

module.exports = leaderRouter;