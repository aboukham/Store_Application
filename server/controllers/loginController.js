const users = require('../models/login')

exports.login = (req,res,next) => {
    res.status(200).json(users.login(req.body.username,req.body.password)); 
};