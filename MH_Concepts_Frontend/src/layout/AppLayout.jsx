import { Outlet } from "react-router"; 
import { Header } from "../pages/Header";
import { Footer } from "../pages/Footer";
import { MessageCircleMore } from "lucide-react";
import "../css/AppLayout.css"; 

export const AppLayout = () => {
    const whatsappNumber = "923094713009"; 
    const welcomeMessage = encodeURIComponent("Hello MH Concepts! I'm interested in your interior designs.");

    return (
        <div className="app-container">
            <Header />
            
            <main className="main-content">
                <Outlet />
            </main>

            {/* FLOATING WHATSAPP BUTTON */}
            <a 
                href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
                className="whatsapp-float"
                target="_blank" 
                rel="noopener noreferrer"
                title="Chat with Hassan Mughal"
            >
                <MessageCircleMore size={32} />
                <span className="tooltip-text">Chat with us</span>
            </a>

            <Footer />
        </div>
    );
};