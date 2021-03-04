const express = require('express');
const router = express.Router();
const { courses } = require('../models');
const Joi = require('joi');
const { Op } = require("sequelize");
const schema = require('../assets/ultity/joiSchema');
const path = require('path');

const myConstanst = require('../assets/ultity/myConstanst');
const { fail } = require('assert');
const NodeRSA = require('node-rsa');
const fs = require('fs');
const {authLogin} = require ('../role/authLogin');




router.get('/', authLogin , (req, res) => {


    courses.findAll().then(course => {

        res.send(course);

    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.get('/:id', (req, res) => {
    courses.findOne({
        where: {
            id: req.params.id
        }
    }).then(course => {
        if (course) res.send(course);
        else res.sendStatus(404);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.get('/search/:search', authLogin , (req, res) => {
    courses.findAll({
        where: {
            name: { 
                [Op.like]: '%' + req.params.search + '%' 
            }
        }
    }).then(course => {
        if (courses) return res.send(course);
        else return res.statusCode(404);
    })
})

router.post('/', (req, res) => {
    const { error } = schema.nameschema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let data = {
        name: req.body.name,
        type: req.body.type,
        cost: req.body.cost
    };
    courses.create({
        name: data.name,
        type: data.type,
        cost: data.cost
    });

    res.send(data);
})

router.put('/:id', (req, res) => {

    course = courses.findAll({
        where: {
            id: req.params.id
        }
    }).then(course => {

        if (!course) return res.sendStatus(404);

        courses.update({
            name: req.body.name,
            type: req.body.type,
            cost: req.body.cost
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {

            return res.json({
                success: true
            });

        }).catch(err => {

            return res.send(err);
        })

    })

})

router.delete('/:id', (req, res) => {
    courses.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.send('delele succes');

    }).catch(err => {

        return res.sendStatus(500);
    })
})




// router.use('/', function (err, req, res, next) {
//     console.log(err);
//     res.sendFile(path.join(__dirname ,'../views/login.html'));
// })
module.exports = router;