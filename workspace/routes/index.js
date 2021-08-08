const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        //  SELECT * FROM USERS;
        const users = await User.findAll();
        res.render('sequelize', {users});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;