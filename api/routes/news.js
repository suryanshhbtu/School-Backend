const express = require('express');
const router = express.Router();     // importing router from express

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'News '
    });
});


router.get('/:newsId', (req, res, next) => {
    if(req.params.newsId === 'special'){
        res.status(200).json({
            message: 'You are Special'
        }); 
    }else{
        res.status(200).json({
            message: 'You are not Special'
        });
    }
    
});

router.post('/', (req, res, next)=>{
    console.log(req.body);
    const news = {
        title: req.body.title,
        msg: req.body.msg,
        isNew: req.body.isNew,
        type: req.body.type
    }
    res.status(200).json({
        message: "Handling Post",
        news: news,
    });
});
module.exports = router;