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
.post(authenticate.verifyUser, authenticate.verifyAdmin, addLeader)
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteLeaders);

leaderRouter.route('/:leaderId')
.get(getLeader)
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, updateLeader)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteLeader);

module.exports = leaderRouter;