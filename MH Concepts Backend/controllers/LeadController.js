const Lead = require("../models/LeadSchema");

exports.submitInquiry = async (req, res) => {
    try {
        const { clientName, clientPhone, productCode } = req.body;

        // Save to Database (This triggers your Nodemailer hook automatically)
        const newLead = await Lead.create({ 
            clientName, 
            clientPhone, 
            productInterested: productCode 
        });

        res.status(200).json({ 
            success: true, 
            message: "Inquiry received! Hassan will contact you soon via email." 
        });

    } catch (error) {
        console.error("Inquiry Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};