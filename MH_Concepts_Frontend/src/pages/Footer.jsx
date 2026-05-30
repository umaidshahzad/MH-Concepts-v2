import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Lock, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'; 
import '../css/Footer.css';

export const Footer = () => {
    // Check if admin is logged in from local storage
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        window.location.href = "/homepage"; 
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>MH CONCEPTS</h2>
                    <p>Creating elegant spaces with premium quality curtains,blinds, flooring, and wall decoration.</p>
                </div>

                <div className="footer-links">
                    <h4>Collections</h4>
                    <ul>
                        {/* <li><Link to="/categorypage/Curtains">Curtains</Link></li>
                        <li><Link to="/categorypage/Flooring">Flooring</Link></li>
                        <li><Link to="/categorypage/Wall Decor">Wall Decor</Link></li> */}
                        <li><Link to="/categorypage/Blinds">Blinds</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><MapPin size={16} /> Lahore, Pakistan</p>
                    <p><Phone size={16} /> +92 309 4713009</p>
                    <p><Mail size={16} /> ha013044@gmail.com</p>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
<div className="social-icons">
    {/* Instagram Link */}
    <a 
        href="https://www.instagram.com/mh_conceptsss?igsh=cWI4NXcyOHdqZnQy" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Instagram"
    >
        <Instagram size={20} />
    </a>

    {/* Facebook Link */}
    <a 
        href="https://www.facebook.com/profile.php?id=61555511127709&mibextid=ZbWKwL" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Facebook"
    >
        <Facebook size={20} />
    </a>
</div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} MH Concepts. All rights reserved.</p>
                    
                    <div className="admin-footer-actions">
                        {isAdmin ? (
                            <>
                                <Link to="/admindashboard" className="admin-discrete-link">
                                    <LayoutDashboard size={12} /> Dashboard
                                </Link>
                                <span className="admin-sep">|</span>
                                <button onClick={handleLogout} className="admin-discrete-link logout-text">
                                    Logout (Hassan)
                                </button>
                            </>
                        ) : (
                            <Link to="/adminlogin" className="admin-discrete-link">
                                <Lock size={12} /> Admin Access
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};