const express = require('express');
const router = express.Router();
const { UserHasRole } = require('../models');
const { Op } = require("sequelize");
const md5 = require('md5');
const path = require('path');
const jwt = require('jsonwebtoken');
const myConstanst = require('../assets/ultity/myConstanst');
const fs = require('fs');
const NodeRSA = require('node-rsa');


//login
router.post('/', (req, res) => {

    if (!req.session.isLogin) {

        md5Passowrd = md5(req.body.password);

        UserHasRole.findOne({
            where: {
                [Op.and]: [
                    { userName: req.body.userName },
                    { password: md5Passowrd }
                ]
            }
        }).then(user => {
            if (!user) return res.sendStatus(400);

            let userWithoutPassword = { user };
            userWithoutPassword.password = '';

            // let privateKey = fs.readFileSync(__dirname + '/../assets/ultity/myprivatekey.pem','utf8');
            let publicKey = fs.readFileSync(__dirname + '/../assets/ultity/mypublickey.pem', 'utf8');

            const key = new NodeRSA(publicKey);
            token = key.encrypt(userWithoutPassword, 'base64');

            req.session.isLogin = token;

            res.json({
                success: true,
                token: token,

            });


        }).catch(err => {

            console.log(err);
            res.status(500).send(err);
        })
    }else {
        res.json({
            success : true ,
            token : req.session.isLogin ,
            message : 'already login'
        })
    }

})

module.exports = router;