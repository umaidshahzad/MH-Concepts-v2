import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { GetSingleProduct, SubmitInquiry } from '../api/axiosAPI';
import { toast, Toaster } from 'react-hot-toast';
import { ArrowLeft, Phone, User, Tag, Info } from 'lucide-react';
import '../css/ProductDetail.css';

export const ProductDetail = () => {
    const { productCode } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await GetSingleProduct(productCode);
                setProduct(res.data.data);
                //console.log(res.data.data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productCode]);

    const handleInquiry = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const dataToSend = {
                ...formData,
                productCode: product.product_code
            };
            await SubmitInquiry(dataToSend);
            toast.success("Inquiry sent! Hassan will contact you soon.");
            setFormData({ clientName: '', clientPhone: '' });
        } catch (error) {
            toast.error("Failed to send inquiry. Please try again.");
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="detail-loader">Loading Excellence...</div>;
    if (!product) return <div className="detail-error">Product not found.</div>;

    return (
        <div className="detail-container">
            <Toaster position="top-center" />
            
            <Link to="/homepage" className="back-btn">
                <ArrowLeft size={20} /> Back to Collection
            </Link>

            <div className="product-view">
                {/* LEFT: IMAGE */}
                <div className="product-visual">
                    <img src={product.image_URL} alt={product.title} />
                </div>

                {/* RIGHT: INFO & FORM */}
                <div className="product-details-content">
                    <div className="header-info">
                        <span className="badge">{product.category}</span>
                        <h1>{product.title}</h1>
                        <p className="product-sku"><Tag size={14}/> Code: {product.product_code}</p>
                        <h2 className="price-display">Rs. {product.price} </h2>
                    </div>

                    <div className="description-box">
                        <h3><Info size={18}/> Description</h3>
                        <p>{product.desc || "No description provided for this premium design."}</p>
                    </div>

                    <div className="inquiry-card">
                        <h3>Get a Quote / Inquiry</h3>
                        <p>Fill in your details and Hassan Mughal will reach out to you immediately.</p>
                        
                        <form onSubmit={handleInquiry}>
                            <div className="input-group">
                                <User size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Your Full Name" 
                                    required
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                />
                            </div>
                            <div className="input-group">
                                <Phone size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Your Phone Number" 
                                    required
                                    value={formData.clientPhone}
                                    onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                                />
                            </div>
                            <button type="submit" disabled={sending} className="submit-inquiry-btn">
                                {sending ? "Sending..." : "Send Inquiry"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};