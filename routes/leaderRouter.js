const express = require('express');
var authenticate = require('../authenticate');

const leaderRouter = express.Router();

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
.all(allAction)
.get(getLeaders)
.post(authenticate.verifyUser, addLeader)
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyUser, deleteLeaders);

leaderRouter.route('/:leaderId')
.get(getLeader)
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put(authenticate.verifyUser, updateLeader)
.delete(authenticate.verifyUser, deleteLeader);

module.exports = leaderRouter;