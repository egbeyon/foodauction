const express = require('express');
const path = require('path');

require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

require('./db/mongoose');

// const Nexmo = require('nexmo')
// const nexmo_key = process.env.NEXMO_KEY
// const nexmo_secret = process.env.NEXMO_SECRET

// const nexmo = new Nexmo({
//   apiKey: nexmo_key,
//   apiSecret: nexmo_secret
// })

// Routes
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const farmRouter = require('./routes/farm');
const hotbuyRouter = require('./routes/hotbuy');
const reserveRouter = require('./routes/reserve');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(farmRouter);
app.use(hotbuyRouter);
app.use(reserveRouter);
app.use(invitationsRouter);

// app.get('/api/test', (req, res) => res.send('Hello World'))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});
app.listen(port, () => console.log(`app is running in PORT: ${port}`));
