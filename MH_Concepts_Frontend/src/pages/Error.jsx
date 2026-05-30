import React from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import '../css/Error.css';

export const Error = () => {
    return (
        <div className="error-page">
            <div className="error-content">
                <h1 className="error-code">404</h1>
                <h2>Oops! Design Not Found</h2>
                <p>The page you are looking for might have been moved or doesn't exist.</p>
                <Link to="/homepage" className="error-btn">
                    <Home size={18} /> Back to MH Concepts
                </Link>
            </div>
        </div>
    );
};