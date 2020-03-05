import express from 'express';

const app = express();

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

export default app;
