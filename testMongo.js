const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    process.exit();
  })
  .catch(err => {
    console.error("MongoDB connection failed ❌", err);
  });
