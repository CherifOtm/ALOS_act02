var express = require('express');
var router = express.Router();
const utils = require('../utils/nft-schema.js');
const nfts = require('../db.json')


// GET
router.get("/nfts" , (request, response) => {
    response.send(nfts);
});

// GET (BY ID)
router.get("/nfts/:id" , (request, response) => {
    const nftId = request.params.id;
    const nft = nfts.find(nft => nft.id === parseInt(nftId));
    if(!nft) return response.status(404).send("The nft with the provided ID does not exist.");
    response.send(nft);
});

// POST
router.post("/nfts", (request, response) => {
    const { error } = utils.validatenft(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

    const nft = {
        id: nfts.length + 1,
        name: request.body.name,
        url: request.body.url,
        date:  request.body.date, 
    };

    nfts.push(nft);
    response.status(200).send(nft);
});

//PUT
router.put("/nfts/:id", (request, response) => {
    const nftId = request.params.id;
    const nft = nfts.find(nft => nft.id === parseInt(nftId));
    if(!nft) return response.status(404).send("The nft with the provided ID does not exist.");

    const { error } = utils.validatenft(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

    nft.name = request.body.name;
    nft.url = request.body.url;
    nft.date = request.body.date;
    

    response.send(nft);
});



//DELETE
router.delete("/nfts/:id", (request, response) => {
    const nftId = request.params.id;
    const nft = nfts.find(nft => nft.id === parseInt(nftId));
    if(!nft) return response.status(404).send("The nft with the provided ID does not exist.");

    const index = nfts.indexOf(nft);
    nfts.splice(index, 1);
    response.send(nft);
});


module.exports = router;
