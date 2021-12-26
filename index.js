const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { logError, errorHandler, boonErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
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