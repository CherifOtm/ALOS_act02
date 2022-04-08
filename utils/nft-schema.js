const Joi = require('joi');

const nftSchema = {
    name: Joi.string().min(3).required(),
    url: Joi.string().required(),
    date: Joi.string().required(),
    
};

exports.validatenft = (nft) => Joi.validate(nft, nftSchema);
