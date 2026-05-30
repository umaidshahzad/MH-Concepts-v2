const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String },
    category: { 
        type: String, 
        required: true,
        enum: ["Flooring", "Wall Decor", "Curtains","Blinds"] 
    },
    
    image_URL: { type: String },
    image_public_id: { type: String },
    price: { type: Number } 
}, { timestamps: true }); 

module.exports = mongoose.model("Product", ProductSchema);