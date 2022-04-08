const express = require('express');
const app = express();

var nftsRouter = require('./routes/nfts');

app.use(express.json());


app.use('/api', nftsRouter);


const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));
