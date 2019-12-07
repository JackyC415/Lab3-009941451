const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const session = require('express-session');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
const app = express();

//cross origin resources sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_lab3_secret',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

//connect to mongoDB through mongoose schema model
mongoose.connect('mongodb://localhost:27017/lab3', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

app.use("/graphql",
  (req, res) => {
    return graphqlHTTP({
      schema,
      graphiql: true,
      context: { req, res },
    })(req, res);
  });

module.exports = app;
app.listen(PORT, () => console.log('Server listening on port:', PORT));