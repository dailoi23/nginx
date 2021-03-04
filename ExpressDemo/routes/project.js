const express = require('express');
const router = express.Router();
const { project } = require('../models');
const Joi = require('joi');
const { Op } = require("sequelize");
const { authLogin, authGetProject } = require('../role/authLogin');
const { ScopedProject } = require('../role/permission');

const SetProject = (req, res, next) => {
    if (req.params.id) {

        project.findOne({
            where: {
                id: req.params.id,
            }
        }).then(pj => {
            if (pj) {
                req.project = pj.dataValues;
                next();
            } else {
                res.sendStatus(404);
            }
        })
    }
    else {
        project.findAll().then(projects => {

            if (projects) {
                req.projects = projects;
                next();
            }
            else {
                res.sendStatus(404);
            }

        }).catch(err => {
            res.sendStatus(500);

        })

    }
}

router.get('/', authLogin, SetProject, (req, res,) => {

    return res.json(ScopedProject(req.projects, req.user));

})

router.get('/:id', authLogin, SetProject, authGetProject, (req, res) => {
    return res.json(req.project);
})



module.exports = router;