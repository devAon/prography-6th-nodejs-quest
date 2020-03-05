import express from 'express';

const app = express();

var indexRouter = require('./routes/index');
app.use('/', indexRouter);


app.use('/hello-world', (req, res) => {
  res.send('hello world');
})

export default app;
