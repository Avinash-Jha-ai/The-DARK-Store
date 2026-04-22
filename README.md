# 🛍️ The DARK Store (MERN Stack)
A premium full-stack e-commerce platform built using the MERN stack, featuring a sophisticated storefront, a data-driven admin portal, and secure backend integration.

💡 **Development Note:** The backend architecture and logic were custom-engineered from scratch, while the frontend user interface and components were developed with significant AI assistance to achieve a premium aesthetic.

🔗 Live Demo: https://the-dark-store.vercel.app/

🔗 admin Live Demo :  https://the-dark-store-bgxj.vercel.app/

💻 GitHub Repo: https://github.com/Avinash-Jha-ai/The-DARK-Store

🚀 Features
🔐 Secure Authentication (JWT & Bcrypt)
📦 Advanced Product Management (CRUD operations)
🛒 Real-time Kart System with persistent storage
💳 Seamless Razorpay Payment Integration
👤 User Profile with Wishlist & Order History
📊 Admin Dashboard with Sales Analytics (Recharts)
📸 Optimized Media Handling (ImageKit)
🎨 Responsive UI with Framer Motion animations

🛠️ Tech Stack
Frontend (Storefront & Admin)
- React.js (Vite)
- Redux Toolkit (State Management)
- Framer Motion (Animations)
- Sass (Modular SCSS)
- Lucide React (Icons)
- Recharts (Data Visualization)

Backend
- Node.js
- Express.js (REST API)

Database
- MongoDB (Mongoose ODM)

Other Tools
- ImageKit (Media storage & optimization)
- Razorpay (Payment gateway)
- JWT (Authentication)
- Multer (File uploads)
- Git & GitHub

📂 Project Structure
```text
THE DARK STORE/
│
├── backend/
│   ├── src/
│   │   ├── configs/        # Database & Service configs
│   │   ├── controllers/    # Business logic (Auth, Product, Order, Kart)
│   │   ├── middlewares/    # Auth & validation middleware
│   │   ├── models/         # MongoDB schemas (Mongoose)
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # External service integrations (Storage)
│   │   └── validator/      # Input validation logic
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
│
├── frontend/ (Storefront)
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Footer, Skeleton)
│   │   ├── features/       # Feature-based logic (Auth, Kart, Products)
│   │   ├── store/          # Redux Toolkit global store
│   │   ├── utils/          # Helper functions (Razorpay loader)
│   │   └── styles/         # Global SCSS
│   └── main.jsx            # Entry point
│
└── admin-portal/ (Dashboard)
    ├── src/
    │   ├── components/     # Admin-specific UI (Sidebar)
    │   ├── features/       # Admin logic (Inventory, Dashboard, Orders)
    │   ├── store/          # Admin Redux store
    │   └── main.jsx        # Entry point
```

⚙️ Installation & Setup
1. Clone the repository
```bash
git clone https://github.com/Avinash-Jha-ai/The-DARK-Store.git
cd THE-DARK-Store
```

2. Install dependencies
```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install

# admin-portal
cd ../admin-portal
npm install
```

3. Setup Environment Variables
Create a `.env` file in the **backend** folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

4. Run the project
```bash
# backend
npm run dev

# frontend
npm run dev

# admin-portal
npm run dev
```

📚 What I Learned
- Designing a scalable multi-portal architecture (Storefront vs. Admin).
- Implementing secure payment gateways with server-side verification.
- Managing complex global states using Redux Toolkit across different user roles.
- Handling cloud-based media optimization with ImageKit.
- Orchestrating a full MERN stack deployment with multi-service interaction.

🔮 Future Improvements
💬 Real-time customer support chat
🔔 Push notifications for order status updates
🔍 AI-driven product recommendations
⚡ Advanced SEO & Server Side Rendering (SSR)

🤝 Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

📬 Contact
GitHub: https://github.com/Avinash-Jha-ai  
LinkedIn: https://www.linkedin.com/in/avinash-jha-0a261b385/  

⭐ If you like this project, don’t forget to give it a star!
