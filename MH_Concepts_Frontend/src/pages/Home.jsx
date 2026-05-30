import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '../api/axiosAPI';
import '../css/Home.css';
import { Link } from 'react-router';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'; 

export const Home = () => {
    const [allProducts, setAllProducts] = useState([]); 
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Blinds");
    const [search, setSearch] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel images
    const carouselImages = [
        '/modern-living-room-with-large-windows-fitted-with-zebra-blinds-allowing-natural-light-control-and-privacy.webp',
        '/1200-blackout-roller-blinds.jpg',
        '/white-roller-blinds-curtains-office-providing-sun-protection-beautiful-river-view-background-curtain-376088055.webp',
        '/Zebra_blinds_4.jpg',
        '/60_blackout_Eloise.webp'
    ];

    // Auto-rotate carousel every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselImages.length]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await GetAllProducts();
                if (res.data && res.data.success) {
                    setAllProducts(res.data.data); 
                    setFilteredProducts(res.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Fetch Error", error);
                setLoading(false);
            }
        };
        fetchAll();
    }, []);
    useEffect(() => {
        let result = allProducts;
        
        // Show all products (remove category filter since all products should be blinds-related)
        
        if (search.trim() !== "") {
            result = result.filter(item => 
                item.title.toLowerCase().includes(search.toLowerCase()) || 
                item.product_code.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort by product_code in ascending order (lower to higher)
        result = result.sort((a, b) => {
            const codeA = parseInt(a.product_code) || 0;
            const codeB = parseInt(b.product_code) || 0;
            return codeA - codeB;
        });

        setFilteredProducts(result);
    }, [search, allProducts]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    return (
        <div className="home-wrapper">
            {/* PROFESSIONAL CAROUSEL HERO */}
            <div className="carousel-hero">
                <div className="carousel-container">
                    {/* Carousel Images */}
                    <div className="carousel-slides">
                        {carouselImages.map((img, index) => (
                            <div 
                                key={index} 
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <img src={img} alt={`Blinds Design ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button className="carousel-btn prev" onClick={prevSlide}>
                        <ChevronLeft size={32} />
                    </button>
                    <button className="carousel-btn next" onClick={nextSlide}>
                        <ChevronRight size={32} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="carousel-dots">
                        {carouselImages.map((_, index) => (
                            <button 
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>

                    {/* Overlay Text */}
                    <div className="carousel-text">
                        <h1>MH CONCEPTS</h1>
                        <p>Premium Blinds & Interior Solutions</p>
                    </div>
                </div>
            </div>

            {/* UPDATED FILTER BAR WITH SEARCH */}
            <div className="filter-bar">
                <div className="filter-container">
                    
                    {/* SEARCH INPUT */}
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by title or code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-divider"></div>

                    {/* CATEGORY DROPDOWN */}
                    <div className="category-select-wrapper">
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="Blinds">Blinds</option>
                        </select>
                        <ChevronDown className="select-icon" size={18} />
                    </div>
                </div>
            </div>

            <main className="gallery-section">
                {loading ? (
                    <div className="luxury-loader">Arranging Gallery...</div>
                ) : (
                    <div className="gallery-grid">
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div key={item._id} className="item-card">
                                    <Link to={`/productdetail/${item.product_code}`}>
                                        <div className="img-container">
                                            <img 
                                                src={item.image_URL.replace('/upload/', '/upload/f_auto,q_auto,w_600/')} 
                                                alt={item.title} 
                                                loading="lazy" 
                                            />
                                            <div className="hover-overlay">
                                                <span>View Design</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="item-details">
                                        <p className="item-cat">{item.category}</p>
                                        <h3 className="item-title">{item.title}</h3>
                                        <p className="item-price">Ref: {item.product_code}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-msg">No matching designs found.</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};