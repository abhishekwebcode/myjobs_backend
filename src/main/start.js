console.clear();
// initialize express app
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formidableMiddleware = require('express-formidable');
const fs = require(`fs`);
global.fs=fs;
const events = require(`events`);
const eventEmitter = new events.EventEmitter();
const ObjectID = require('mongodb').ObjectId;
const mongo = require("../mongodb/mongodb");
console.dir(mongo)
var getDB=mongo;
const {parse, stringify} = require('flatted/cjs');
process.env.NODE_ENV = 'production';
const express = require('express');
const app = express();
// view engine setup
app.use(formidableMiddleware())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set(`db`,mongo);
app.set(`id`,ObjectID);
app.set(`event`,eventEmitter);
// DO all auth functions
let user_auth=require(`../auth/user_auth`);
app.post('/signup',user_auth.sign_up);
app.post(`/login`,user_auth.login);
app.post('/google_auth',user_auth.google_auth);
app.post('/facebook_auth',user_auth.facebook);
// require auth to proceed
require(`../classes/jwt-check`)(app);
// tests module
require(`../tests/init`)(app);
// jobs module
require(`../jobs/init`)(app);
// gamification module
require(`../gamification/init`)(app);
app.listen(
    process.env.PORT || 3000,
    () =>
        console.log(
            `Example app listening on port ${process.env.PORT || 3000} !`
        )
);
