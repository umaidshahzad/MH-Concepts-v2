import React, { useEffect, useState } from 'react';
import { getDashboardStats, getAllLeads, GetAllProducts, DeleteProduct, DeleteLead, UpdateLeadStatus, CreateProduct, UpdateProduct } from '../api/axiosAPI';
import { toast, Toaster } from 'react-hot-toast';
import { Users, Box, Plus, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';
import '../css/AdminDashboard.css';

export const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalProducts: 0, totalLeads: 0, newLeads: 0 });
    const [leads, setLeads] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('leads'); 
    const [isEditing, setIsEditing] = useState(false);
    
    const [newProduct, setNewProduct] = useState({ title: '', desc: '', category: 'Blinds', product_code: '', price: '' });
    const [file, setFile] = useState(null);

    // Protection
    if (localStorage.getItem('isAdmin') !== 'true') {
        return <div style={{textAlign: 'center', padding: '100px'}}><h2>Access Denied</h2><a href="/adminlogin">Go to Login</a></div>;
    }

const fetchData = async () => {
    try {
        const s = await getDashboardStats();
        const l = await getAllLeads();
        const p = await GetAllProducts();
        
        setStats(s.data?.stats || { totalProducts: 0, totalLeads: 0, newLeads: 0 });
        setLeads(l.data?.data || []); 
        
        // Sort products by product_code in ascending order (lower to higher)
        const sortedProducts = (p.data?.data || []).sort((a, b) => {
            const codeA = parseInt(a.product_code) || 0;
            const codeB = parseInt(b.product_code) || 0;
            return codeA - codeB;
        });
        setProducts(sortedProducts);
    } catch (e) { 
        if (e.response && e.response.status === 401) {
            localStorage.removeItem('isAdmin');
            toast.error("Session expired. Please login again.");
            setTimeout(() => window.location.href = "/adminlogin", 2000);
        } else {
            toast.error("Error loading dashboard data"); 
        }
    }
};

    useEffect(() => { fetchData(); }, []);

    const handleUpdateLead = async (id, status) => {
        try {
            await UpdateLeadStatus(id, status);
            toast.success("Status Updated");
            fetchData(); 
        } catch (e) { toast.error("Failed to update status"); }
    };

    // ADDED THIS: handleDeleteLead
    const handleDeleteLead = async (id) => {
        if(window.confirm("Delete this inquiry?")) {
            try {
                await DeleteLead(id);
                toast.success("Inquiry Deleted");
                fetchData();
            } catch (e) { toast.error("Delete failed"); }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append('desc', newProduct.desc);
        formData.append('category', newProduct.category);
        formData.append('product_code', newProduct.product_code);
        formData.append('price', newProduct.price);
        if (file) formData.append('file', file); // 'file' matches your backend req.files.file

        try {
            if (isEditing) {
                await UpdateProduct(newProduct.product_code, formData);
                toast.success("Product Updated!");
            } else {
                await CreateProduct(formData);
                toast.success("Product Added!");
            }
            setIsEditing(false);
            setNewProduct({ title: '', desc: '', category: 'Curtains', product_code: '', price: '' });
            setFile(null); // Clear file
            fetchData(); 
        } catch (e) { toast.error(isEditing ? "Update failed" : "Upload failed"); }
    };

    const handleDeleteProduct = async (code) => {
        if(window.confirm("Delete this design?")) {
            try {
                await DeleteProduct(code);
                toast.success("Product Deleted");
                fetchData(); 
            } catch (e) { toast.error("Delete failed"); }
        }
    };

    const startEdit = (product) => {
        setNewProduct({
            title: product.title,
            desc: product.desc,
            category: product.category,
            product_code: product.product_code,
            price: product.price
        });
        setIsEditing(true);
        setActiveTab('products');
    };

    return (
        <div className="dashboard-container">
            <Toaster />
            <div className="stats-row">
                <div className="stat-card">
                    <Box color="#c5a059" />
                    <div><h3>{stats.totalProducts}</h3><p>Products</p></div>
                </div>
                <div className="stat-card">
                    <Users color="#c5a059" />
                    <div><h3>{stats.totalLeads}</h3><p>Total Leads</p></div>
                </div>
                <div className="stat-card highlight">
                    <div><h3>{stats.newLeads}</h3><p>New Inquiries</p></div>
                </div>
            </div>

            <div className="tab-nav">
                <button className={activeTab === 'leads' ? 'active' : ''} onClick={() => setActiveTab('leads')}>Customer Inquiries</button>
                <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Manage Inventory</button>
            </div>

            <div className="content-area">
                {activeTab === 'leads' ? (
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Name</th><th>Phone</th><th>Interested In</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {leads?.map(lead => (
                                    <tr key={lead._id}>
                                        <td>{lead.clientName}</td>
                                        <td>{lead.clientPhone}</td>
                                        <td>{lead.productInterested}</td>
                                        <td>
                                           {new Date(lead.createdAt).toLocaleString('en-PK', {
                                            day: '2-digit',
                                             month: 'short',
                                             year: 'numeric',
                                             hour: '2-digit',
                                             minute: '2-digit',
                                             hour12: true
                                               })}
                                               </td>
                                        <td><span className={`status ${lead.status}`}>{lead.status}</span></td>
                                        <td>
                                            <button onClick={() => handleUpdateLead(lead._id, "Contacted")} title="Mark Contacted"><CheckCircle size={18} color="green"/></button>
                                            <button onClick={() => handleDeleteLead(lead._id)} className="del-btn"><Trash2 size={18} color="red"/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="inventory-section">
                        <form className="add-form" onSubmit={handleAddProduct}>
                            <h4>{isEditing ? `Editing ${newProduct.product_code}` : "Add New Design"}</h4>
                            
                            {/* ADDED: value prop to all inputs below */}
                            <input type="text" placeholder="Title" value={newProduct.title}
                              onChange={e => setNewProduct({...newProduct, title: e.target.value})} required />
                            
                            <input type="text" placeholder="Code: 101" value={newProduct.product_code}
                              onChange={e => setNewProduct({...newProduct, product_code: e.target.value})} required disabled={isEditing} />

                            <input type="text" placeholder="Description" value={newProduct.desc}
                              onChange={e => setNewProduct({...newProduct, desc: e.target.value})} required />

                            <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                                <option value="Blinds">Blinds</option>
                            </select>

                            <input type="number" placeholder="Price" value={newProduct.price}
                              onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                            
                            {/* <input type="file" onChange={e => setFile(e.target.files[0])} required={!isEditing} /> */}
                            
<input 
    type="file" 
    accept="image/*" 
    onChange={e => setFile(e.target.files[0])} 
    required={!isEditing} 
/>

                            <button type="submit">{isEditing ? "Save Changes" : "Upload to Cloudinary"}</button>
                            {isEditing && <button type="button" className="cancel-btn" onClick={() => { setIsEditing(false); setNewProduct({title:'', desc:'', category:'Blinds', product_code:'', price:''}); }}>Cancel</button>}
                        </form>
                        
                        <div className="mini-grid">
                            {products?.map(p => (
                                <div className="mini-card" key={p._id}>
                                    <img src={p.image_URL} alt="" onClick={() => startEdit(p)} style={{cursor: 'pointer'}} title="Click to Edit" />
                                    <p>{p.product_code}</p>
                                    <button onClick={() => handleDeleteProduct(p.product_code)}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};