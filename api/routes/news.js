const express = require('express');
const router = express.Router();

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

module.exports = router;