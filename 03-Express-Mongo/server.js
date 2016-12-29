'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

var paginate = require('express-paginate');
var mongoosePaginate = require('mongoose-paginate');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(paginate.middleware(10, 50));

const mongodbUri = 'mongodb://localhost:27017/exampleDb';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/put_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));
app.use('/api/auth/login', require('./api/contacts/routes/post_login'));

const hostname = 'localhost';
const port = 3001;
const server = app.listen(port, hostname, () => {

  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});
