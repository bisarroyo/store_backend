const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const URL = `mongodb+srv://${user}:${password}@cluster0.2mpwz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(URL).
  then(() => console.log('Connected to MongoDB')).
  catch(error => console.log(error));

const routerApi = require('./routes');
const { logError, errorHandler, boonErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:9000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.use(logError);
app.use(errorHandler);
app.use(boonErrorHandler);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});