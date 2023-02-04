// requestListner -> for handling request easily
const express = require('express'); // importing express
const newsRouter = require('./api/routes/news');
const app = express();              // executing express

app.use('/news', newsRouter);

app.use((req, res, next) => {       // use is middleware  which accepts arrow function (request, response, next)
    res.status(200).json({
        message: 'It Works!'
    });
});
module.exports = app;