const express = require('express');
const morgan = require('morgan');
const app = express();
const rateLimit = require("express-rate-limit")

require('dotenv').config();


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(morgan('tiny'));
// app.use(limiter)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Testing OAuth Google',
    });
});
app.get('/limiter', limiter, (req, res) => {
    res.status(200).json({
        message: 'Testing Limiter',
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
