const express = require('express');
const router = express.Router();

// GET/user 라우터
router.get('/', (req,res)=>
{
    res.send('Hello, User');
});

// :id -> 이 부분에는 다른 값을 넣을 수 있는데,
// 예로 들어, req.params.id = 123
// /user/123
router.get('/user/:id', (req, res) =>{
    console.log(req.params, req.query);
}); 

module.exports = router;