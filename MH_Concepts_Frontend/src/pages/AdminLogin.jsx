import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../api/axiosAPI';
import { toast, Toaster } from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';
import '../css/AdminLogin.css';

export const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  // Inside handleLogin in AdminLogin.jsx
const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await login(credentials);
        if (res.data.role === "Admin") {
            // Write in the "Notebook"
            localStorage.setItem('isAdmin', 'true'); 
            toast.success("Welcome, Hassan!");
            // Force refresh to update Footer and redirect
            window.location.href = "/admindashboard"; 
        }
    } catch (error) {
        toast.error("Invalid Credentials");
    }
};

    return (
        <div className="login-container">
            <Toaster />
            <div className="login-card">
                <h2>MH CONCEPTS</h2>
                <p>Admin Control Portal</p>
                <form onSubmit={handleLogin}>
                    <div className="auth-input">
                        <Mail size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            required 
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div className="auth-input">
                        <Lock size={18} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Authenticating..." : "Login to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
};