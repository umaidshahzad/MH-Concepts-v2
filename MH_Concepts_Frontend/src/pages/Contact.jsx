import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { SubmitInquiry } from '../api/axiosAPI';
import { toast, Toaster } from 'react-hot-toast';
import '../css/Contact.css';

export const Contact = () => {
    const [formData, setFormData] = useState({ clientName: '', clientPhone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Reusing your inquiry logic (productCode is "GENERAL" for contact page)
            await SubmitInquiry({ ...formData, productCode: "General Inquiry" });
            toast.success("Message sent! Hassan will contact you.");
            setFormData({ clientName: '', clientPhone: '', message: '' });
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <Toaster />
            <div className="contact-header">
                <h1>GET IN TOUCH</h1>
                <p>Have a project in mind? Let's discuss your interior needs.</p>
            </div>

            <div className="contact-container">
                {/* LEFT SIDE: INFO */}
                <div className="contact-info">
                    <div className="info-item">
                        {/* <MapPin className="info-icon" /> */}
                        {/* <div>
                            <h4>Visit Our Showroom</h4>
                            <p>Main Boulevard, DHA Phase 6, Lahore, Pakistan</p>
                        </div> */}
                    </div>
                    <div className="info-item">
                        <Phone className="info-icon" />
                        <div>
                            <h4>Call or WhatsApp</h4>
                            <p>+92 309 4713009</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Mail className="info-icon" />
                        <div>
                            <h4>Email Us</h4>
                            <p>mhconcepts.decoration@gmail.com</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Clock className="info-icon" />
                        <div>
                            <h4>Business Hours</h4>
                            <p>Mon - Sat: 11:00 AM - 09:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: FORM */}
                <div className="contact-form-box">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            required 
                            value={formData.clientName}
                            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        />
                        <input 
                            type="text" 
                            placeholder="Phone Number" 
                            required 
                            value={formData.clientPhone}
                            onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                        />
                        <textarea 
                            placeholder="How can we help you?" 
                            rows="5"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"} <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* GOOGLE MAP EMBED */}
        <div className="map-section">
    <iframe 
        title="MH Concepts Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195.62561420570458!2d74.31199973918385!3d31.528215828779846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919050057a4cd21%3A0x6d255fb862928834!2sMH%20CONCEPTS!5e1!3m2!1sen!2s!4v1770923049118!5m2!1sen!2s" 
        width="100%" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
</div>
        </div>
    );
};