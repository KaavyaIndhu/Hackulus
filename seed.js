const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Paper = require('./models/Paper');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding ✅");

    // Clear existing users and papers
    await User.deleteMany({});
    await Paper.deleteMany({});

    // Create mentor user
    const mentor = new User({
      name: 'Maya Mentor',
      email: 'maya@uni.edu',
      password: 'password123', // plaintext for demo
      role: 'mentor',
      credits: 0
    });

    // Create researcher user
    const researcher = new User({
      name: 'Rhea Researcher',
      email: 'rhea@uni.edu',
      password: 'password123', // plaintext for demo
      role: 'researcher'
    });

    await mentor.save();
    await researcher.save();

    // Optional: create a sample paper uploaded by researcher
    const paper = new Paper({
      title: 'Quantum Computing Advances',
      abstract: 'An overview of the latest progress in quantum computing research.',
      authorId: researcher._id,
      reviews: []
    });
    await paper.save();

    console.log("✅ Seed complete!");
    process.exit(0);
  })
  .catch(err => console.log(err));

