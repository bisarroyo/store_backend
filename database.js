const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const URL = `mongodb+srv://${user}:${password}@cluster0.2mpwz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(URL).
  then(() => console.log('Connected to MongoDB')).
  catch(error => console.log(error));

