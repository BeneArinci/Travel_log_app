const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middlewares')

mongoose.connect(process.env.DATABASE_URL)
const app = express();

app.use(morgan('common'))

app.use(helmet())

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello! No content here atm ;)'
    });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`listening at http://locakhost:${port}`);
});
