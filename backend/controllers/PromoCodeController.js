const PromoCode = require("../models/PromoCode");

const createPromoCode = async (req, res) => {
    const { code,discount } = req.body;
    try {
        const promoCode = await PromoCode.create({
            code,
            discount, 
        });
        res.status(201).json(promoCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllPromoCodes = async (req, res) => {
    
    try {
        const promocode = await PromoCode.find({}); 
        res.status(200).json(promocode); // Return the filtered activities
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPromoCode,getAllPromoCodes
    
};