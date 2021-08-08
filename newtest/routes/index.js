const express = require('express');
const router = express.Router();

// GET / 메인 라우터
router.get('/', (req,res) => {
    res.send('Hello, Express');
});

router.get('/users', (req,res) => {
    res.send('Hello, Users');
});

module.exports = router;