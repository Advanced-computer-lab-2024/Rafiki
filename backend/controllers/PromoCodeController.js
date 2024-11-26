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
    const { available } = req.query; // Optional query parameter
    const filter = available ? { available: available === 'true' } : {};
    
    try {
        const promocode = await PromoCode.find(filter); 
        res.status(200).json(promocode); // Return the filtered activities
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const usePromoCode = async (req, res) => {
    const { code } = req.body;
    try {
        console.log("Searching for promo code:", code);

        // Find the promo code (case-insensitive) and ensure it's available
        const promoCode = await PromoCode.findOne({
            code:code, // Case-insensitive
        });
        console.log("Found promo code:", promoCode);

        if (!promoCode || !promoCode.available) {
            return res.status(404).json({ error: "Promo code not found or already used." });
        }

        // Mark the promo code as used
        promoCode.available = false;
        await promoCode.save();

        res.status(200).json({
            message: "Promo code used successfully.",
            promoCode,
        });
    } catch (error) {
        console.error("Error in usePromoCode:", error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { createPromoCode,getAllPromoCodes,usePromoCode
    
};