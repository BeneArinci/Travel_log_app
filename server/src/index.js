const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')

const app = express();

app.use(morgan('common'))

app.use(helmet())

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello! No content here atm ;)'
    });
});

// residual routes management for not found endpoints
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '---' : error.stack,
    })
})

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`listening at http://locakhost:${port}`);
});
