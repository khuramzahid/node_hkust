const models = require('../models');

const allAction = (req,res,next) => {
    res.statusCode = 200;
    next();
}

const getLeaders = async (req,res,next) => {
    try {
        console.log(req.query);
        const leaders = await models.Leader.findAll({});

        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }
    catch(error) {
        next(error);
    }
}

const addLeader = async (req, res, next) => {
    try {
        let {
            name,
            image,
            designation,
            abbr,
            featured,
            description
        } = req.body;

        const insertedLeader = await models.Leader.create({
            name,
            image,
            designation,
            abbr,
            featured,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { returning: true });
        
        res.setHeader('Content-Type', 'text/plain');
        res.end('Added leader: ' + insertedLeader.id);
    }
    catch(error) {
        next(error);
    }
}

const deleteLeaders = async (req, res, next) => {
    try {
        await models.Leader.destroy({
            where: {}
        });

        res.setHeader('Content-Type', 'text/plain');
        res.end('Deleted all leaders.');
    }
    catch(error) {
        next(error);
    }
}

const getLeader = async (req,res,next) => {
    try {
        const leader = await models.Leader.findOne({
            where: {
                id: req.params.leaderId
            }
        });

        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }
    catch(error) {
        next(error);
    }
}

const updateLeader = async (req, res, next) => {
    try {
        let {
            name,
            image,
            designation,
            abbr,
            featured,
            description
        } = req.body;

        const insertedLeader = await models.Leader.update({
            name,
            image,
            designation,
            abbr,
            featured,
            description,
            updatedAt: new Date()
        }, { 
            where: { id: req.params.leaderId },
            returning: true,
            plain: true
        });

        res.setHeader('Content-Type', 'text/plain');
        res.end('Updated leader: ' + req.params.leaderId);
    }
    catch(error) {
        next(error);
    }
}

const deleteLeader = async (req, res, next) => {
    try {
        await models.Leader.destroy({
            where: {
                id: req.params.leaderId
            }
        });

        res.setHeader('Content-Type', 'text/plain');
        res.end('Deleted leader: ' + req.params.leaderId);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    allAction,
    getLeaders,
    addLeader,
    deleteLeaders,
    getLeader,
    updateLeader,
    deleteLeader
}