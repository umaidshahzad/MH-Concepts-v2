<div align="center">
  <h1>MH Concepts</h1>
  <i>A Full-Stack MERN E-Commerce & Catalog Management System</i>
  <br />
  <!-- <a href="YOUR_LIVE_DEPLOYMENT_URL"><strong>View Live Deployment</strong></a> -->
  <br />
  <br />

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  ![WhatsApp](https://img.shields.io/badge/WhatsApp_Cloud_API-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
</div>

## ✨ Overview
**MH Concepts** is a professional-grade MERN stack application designed to digitize a luxury interior decor business. It serves as a bridge between an expanding product catalog and high-speed customer engagement. 

The platform boasts a dynamic frontend for customers to browse detailed product pages and an advanced, secure backend admin dashboard that handles inventory management, cloud media sync, and an automated lead-generation notification engine via WhatsApp and Email.

## 🛠️ Tech Stack & Technologies Used

### Frontend
- **React (v19) & Vite**: For lightning-fast development, HMR, and optimal production builds.
- **React Router**: Client-side routing, protected routes, and seamless navigation.
- **Axios**: For robust HTTP requests to the backend API.
- **Lucide React**: Sharp, consistent SVG iconography.
- **React Hot Toast**: Beautiful, non-intrusive push notifications.
- **CSS**: Custom luxury minimalist UI reflecting premium decor.

### Backend
- **Node.js & Express.js**: RESTful API architecture handling routing, middleware, and CORS.
- **MongoDB & Mongoose**: NoSQL database with optimized indexing on product codes for instant retrieval.
- **Authentication**: JWT (JSON Web Tokens) stored securely in HttpOnly cookies to prevent XSS attacks, coupled with **Bcrypt** for password hashing.
- **File Uploads**: `express-fileupload` and `multer` for parsing incoming media files.
- **Cloudinary**: Cloud image hosting and on-the-fly optimization (dynamic URL transformation compressing 10MB images to ~50KB).

### Notification Engine & Automations
- **Meta WhatsApp Cloud API**: Automatically sends a templated message to the owner's WhatsApp when a client submits an inquiry.
- **Nodemailer & Resend**: Parallel SMTP transport sending formatted HTML emails containing lead details.
- **Mongoose Post-Save Hooks**: Background triggers that execute the notification logic immediately after a new Lead is saved to the database.

## 🌟 Key Features
- **Dynamic Catalog & Search**: Advanced filtering by categories (Flooring, Curtains, etc.) and search by Product Code or Title.
- **Secure Admin Dashboard**: Mobile-first control center. Admin can upload live photos straight from a phone to the live website.
- **Lead Management Ledger**: A digital table of every customer inquiry. Admin can track "Contacted" status or delete old records.
- **Inventory Grid**: A visual representation of stock allowing 1-click "Edit Mode" for prices and descriptions.
- **Cloudinary Sync Logic**: Automatically calls Cloudinary's "Destroy" API when a product is deleted/updated, keeping cloud storage clean.

## 📂 Folder Structure
```text
MH Concepts/
├── MH_Concepts_Frontend/        # React + Vite Frontend Application
│   ├── public/                  
│   ├── src/                     
│   │   ├── api/                 # Axios configuration
│   │   ├── layout/              # App Layout Wrappers
│   │   ├── pages/               # Components (AdminDashboard, ProductDetail, etc.)
│   │   └── App.jsx              # Application Routes & Protected Routes
│   └── package.json             
│
└── MH Concepts Backend/         # Node.js + Express Backend Application
    ├── config/                  # DB connection and Cloudinary configs
    ├── controllers/             # AdminController, LeadController
    ├── middlewares/             # Auth Guards, Error Handling
    ├── models/                  # Mongoose Schemas (User, Product, Lead)
    ├── routes/                  # Express API Routes
    ├── index.js                 # Server entry point
    └── package.json             
```

## 🚀 Getting Started

Follow these instructions to run both the frontend and backend locally.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or an Atlas URI.

### 1. Clone the repository
```bash
git clone <repository-url>
cd "new MH Concepts"
```

### 2. Backend Setup
```bash
cd "MH Concepts Backend"
npm install
```
Create a `.env` file in `MH Concepts Backend/` with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
WHATSAPP_TOKEN=your_meta_api_token
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd "MH_Concepts_Frontend"
npm install
```
Create a `.env` file in `MH_Concepts_Frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

### 4. View the App
Open [http://localhost:5173](http://localhost:5173) in your browser!
