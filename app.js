// requestListner -> for handling request easily
const express = require('express'); // importing express
const newsRouter = require('./api/routes/news');
const app = express();              // executing express
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/news', newsRouter);

app.use(morgan('dev'));             // it logs all the requests made to server GET/PATCH/POST/DELETE -> GET /news/special 200 7.979 ms - 23

app.use((req, res, next) => {       // ERROR INFORMATION INSIDE HTML
    error.status = 404;
    next(error);
});
// this  code converts above html error to json error
app.use((error, req, res, next) => {       // ERROR INDORMATION INSIDE HTML
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    })
});

module.exports = app;