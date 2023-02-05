// requestListner -> for handling request easily
const express = require('express'); // importing express
const newsRouter = require('./api/routes/news');
const staffsRouter = require('./api/routes/staffs');
const noticesRouter = require('./api/routes/notices');
const app = express();              // executing express
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Handling CORS Errors -> Cross-Origin-Resourse-Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://suryanshhbtu:suryanshhbtu@cluster0.t1zpklg.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log("Connected to MongoDB");
});
// mongoose.connect('',
//     { useNewUrlParser: true });   // ??????????????????????????????????????

app.use(bodyParser.urlencoded({ extended: false }));  //???????????
app.use(bodyParser.json());          // req.body -> undefined -> json
app.use('/news', newsRouter);
app.use('/staffs', staffsRouter);
app.use('/notices', noticesRouter);

app.use(morgan('dev'));             // it logs all the requests made to server GET/PATCH/POST/DELETE -> GET /news/special 200 7.979 ms - 23

app.use((req, res, next) => {       // ERROR INFORMATION INSIDE HTML
    error.status = 404;
    next(error);
});
// this  code converts above html error to json error
app.use((error, req, res, next) => {       // ERROR INDORMATION INSIDE HTML
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;