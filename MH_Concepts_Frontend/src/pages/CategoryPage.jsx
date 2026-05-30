import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { GetProductByCategory } from '../api/axiosAPI';
import '../css/Home.css'; // Reuse your gallery styling to keep it consistent

export const CategoryPage = () => {
    const { categoryName } = useParams(); // Gets "Curtains" or "Flooring" from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                const res = await GetProductByCategory(categoryName);
                // Based on your backend, data is in res.data.product or res.data.data
                setProducts(res.data.product || res.data.data || []);
            } catch (error) {
                console.error("Error fetching category", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, [categoryName]); // Re-run if user clicks a different link in footer

    return (
        <div className="home-wrapper">
            <header className="hero-simple" style={{height: '30vh'}}>
                <div className="hero-text">
                    <h1 style={{fontSize: '2.5rem'}}>{categoryName} Collection</h1>
                    <p>MH Concepts Premium Selection</p>
                </div>
            </header>

            <main className="gallery-section">
                {loading ? (
                    <div className="luxury-loader">Loading {categoryName}...</div>
                ) : (
                    <div className="gallery-grid">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <div key={item._id} className="item-card">
                                    <Link to={`/productdetail/${item.product_code}`}>
                                        <div className="img-container">
                                            <img src={item.image_URL} alt={item.title} />
                                        </div>
                                    </Link>
                                    <div className="item-details">
                                        <h3 className="item-title">{item.title}</h3>
                                        <p className="item-price">Ref: {item.product_code}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-msg">No designs found in {categoryName} yet.</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};