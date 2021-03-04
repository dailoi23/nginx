const NodeRSA = require('node-rsa');
const fs = require('fs');
const { ROLE } = require('../assets/ultity/myConstanst')
const { CanViewProject } = require('./permission');
const joi = require('joi');


const authLogin = (req, res, next) => {


    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        let privateKey = fs.readFileSync(__dirname + '/../assets/ultity/myprivatekey.pem', 'utf8');
        const key = new NodeRSA(privateKey);

        try {
            result = key.decrypt(token, 'json');
            if (result) {

                req.user = result.user;
                req.user.password = '';
                next();

            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'cant verify token'
                })
            }

        } catch (err) {
            res.status(400);
            return res.json({
                success: false,
                message: 'cant verify token'
            });
        }
    }
    else {

        res.status(400);
        return res.json({
            success: false,
            message: 'no token was provided'
        })
    }
}

const authAdmin = (req, res, next) => {
    if (req.user.role === ROLE.ADMIN) next();
    else {
        res.status(401);
        return res.json({
            success: false,
            message: 'not an admin user'
        })
    }
}

const authGetProject = (req, res, next) => {

    if (CanViewProject(req.project, req.user)) { next(); }
    else { return res.sendStatus(401); }
}


module.exports = {
    authLogin,
    authAdmin,
    authGetProject,
}