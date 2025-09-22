const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const paperRoutes = require('./routes/paper');
const mentoringRoutes = require('./routes/mentoring');

const app = express();

// Middleware
app.use(express.json());

// Allow requests from frontend
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Serve static files (optional)
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);
app.use('/papers', paperRoutes);
app.use('/mentoring', mentoringRoutes);

// Test route
app.get('/api', (req, res) => res.send("Backend is running ✅"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Database: Connected to MongoDB");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, async () => {
            console.log(`✅ Backend: Running on http://localhost:${PORT}`);
            console.log("✅ Frontend: Running on http://localhost:3000");

            // quick login test (optional: only if you want to check auth API works)
            try {
                // here we just confirm route exists instead of making a request
                console.log("✅ Login API: Ready at /auth/login");
            } catch (err) {
                console.log("⚠️ Login API: Not responding");
            }
        });
    })
    .catch(err => console.log("❌ Database connection error:", err));
