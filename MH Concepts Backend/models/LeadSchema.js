const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const LeadSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    productInterested: { type: String }, // Store the product_code here
    status: { type: String, enum: ["New", "Contacted"], default: "New" }
}, { timestamps: true });

// LeadSchema.post("save", async function (doc) {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,//gmail,hotmail etc
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS
//             }
//         });

//         let info = await transporter.sendMail({
//             from: `MH Concepts Notifications <${process.env.MAIL_USER}>`,
//             to: process.env.ADMIN_EMAIL, 
//             subject: `🚀 New Lead: ${doc.clientName} is interested!`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
//                     <h2 style="color: #333;">New Business Inquiry for MH Concepts</h2>
//                     <p><strong>Customer Name:</strong> ${doc.clientName}</p>
//                     <p><strong>Phone Number:</strong> ${doc.clientPhone}</p>
//                     <p><strong>Interested In (Product Code):</strong> ${doc.productInterested}</p>
//                     <hr />
//                     <p style="color: #555;">Please contact the client as soon as possible.</p>
//                     <a href="https://wa.me/${doc.clientPhone}" style="background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
//                         WhatsApp Client Now
//                     </a>
//                 </div>
//             `
//         });

//         console.log("Email sent successfully ", info);
        
//     } catch (error) {
//         console.error("Error in Post-save Email Hook:", error);
//     }
// });

// module.exports = mongoose.model("Lead", LeadSchema);



LeadSchema.post("save", async function (doc) {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Use a verified domain later, this works for now
            to: process.env.ADMIN_EMAIL,
            subject: `🚀 New Lead: ${doc.clientName} is interested!`,
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #333;">New Business Inquiry for MH Concepts</h2>
                    <p><strong>Customer Name:</strong> ${doc.clientName}</p>
                    <p><strong>Phone Number:</strong> ${doc.clientPhone}</p>
                    <p><strong>Interested In (Product Code):</strong> ${doc.productInterested}</p>
                    <hr />
                    <p style="color: #555;">Please contact the client as soon as possible.</p>
                    <a href="https://wa.me/${doc.clientPhone}" style="background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                        WhatsApp Client Now
                    </a>
                </div>
            `
        });

        console.log("Email sent successfully via Resend", data);
    } catch (error) {
        console.error("Error in Post-save Email Hook:", error);
    }
});


module.exports = mongoose.model("Lead", LeadSchema);