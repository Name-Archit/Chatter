const express = require('express');
const path = require('path');

const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const cookie = require('cookie-parser');
app.use(cookie());

const dotenv = require('dotenv');
dotenv.config();

const userModel = require('./models/user.model');
const chatModel = require('./models/chat.model');
const connectToDB = require('./config/db');
connectToDB();


const userRouter = require('./routes/user.routes');
const homeRouter = require('./routes/home.routes')
const registerRouter = require('./routes/register.routes')
const indexRouter = require('./routes/index.routes')

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.set("view engine", 'ejs');

app.use('/user', userRouter);
app.use('/user', homeRouter);
app.use('/user', registerRouter);
app.use('/user', indexRouter);


app.listen(3000);