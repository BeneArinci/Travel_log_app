const express = require ('express');

const app = express();

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log('listening at http://locakhost:1337');
})