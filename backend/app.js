var express = require('express');
var app = express();
var cors = require('cors');
const dataLoaderRouter = require('./routes/dataLoader');
const schemesRouter = require('./routes/schemes');
const mutualFundsRouter = require('./routes/mutualfunds');
const {
    setupObjectionDb
} = require('./db/db');

setupObjectionDb();
// use it before all route definitions
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/dataloader', dataLoaderRouter);
app.use('/schemes', schemesRouter);
app.use('/mutualfunds', mutualFundsRouter);

app.use(express.json());

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});