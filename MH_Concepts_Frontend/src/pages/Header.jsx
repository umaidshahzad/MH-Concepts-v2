
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router'; // FIX: Always use react-router-dom for web
import { Menu, X, PhoneCall, LayoutDashboard } from 'lucide-react';
import '../css/Header.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // We check this every time the header renders
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Helper for active link styling
    const activeClass = ({ isActive }) => isActive ? "active-link" : "";

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* LOGO */}
                <Link to="/homepage" className="nav-logo">
                    MH CONCEPTS
                </Link>

                {/* DESKTOP MENU */}
                <div className="nav-links">
                    <NavLink to="/homepage" className={activeClass}>Home</NavLink>
                    {/* <NavLink to="/categorypage/Curtains" className={activeClass}>Curtains</NavLink>
                    <NavLink to="/categorypage/Flooring" className={activeClass}>Flooring</NavLink>
                    <NavLink to="/categorypage/Wall Decor" className={activeClass}>Wall Decor</NavLink> */}
                    <NavLink to="/categorypage/Blinds" className={activeClass}>Blinds</NavLink>
                    <NavLink to="/contact" className={activeClass}>Contact</NavLink> 
                    
                    {/* Logged In Only */}
                    {isAdmin && (
                        <NavLink to="/admindashboard" className={activeClass} style={{color: '#c5a059', fontWeight: 'bold'}}>
                           Dashboard
                        </NavLink>
                    )}
                </div>

                {/* ACTION BUTTON */}
                <div className="nav-actions">
                    <a href="tel:+923094713009" className="contact-pill">
                        <PhoneCall size={18} />
                        <span>Call Us</span>
                    </a>
                    {/* MOBILE TOGGLE */}
                    <button className="mobile-icon" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <NavLink to="/homepage" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/categorypage/Blinds" onClick={toggleMenu}>Blinds</NavLink>
                <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
                
                {/* ADDED: Dashboard for Mobile */}
                {isAdmin && (
                    <NavLink to="/admindashboard" onClick={toggleMenu} style={{color: '#c5a059'}}>
                        Admin Dashboard
                    </NavLink>
                )}
            </div>
        </nav>
    );
};