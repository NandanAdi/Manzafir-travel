require("dotenv").config();

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User')
const Match  = require('./models/Match')
const cors = require("cors");
const nodemailer = require("nodemailer");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// API Routes
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//Contact
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
 // Setup Nodemailer Transport
 let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let mailOptions = {
  from:`"Manzafir" ${process.env.EMAIL_USER}`,
  to: process.env.EMAIL_USER, // Send email to yourself
  subject: "New Contact Form Submission",
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
};

try {
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Email sent successfully!" });
} catch (error) {
  res.status(500).json({ message: "Failed to send email.", error });
}
});


//Other Routes for Matching
app.get('/users', async (req, res) => {
    const { userId } = req.query;

    // Exclude users already swiped by this user
    const user = await User.findById(userId);
    const swipedUserIds = user.swipedUsers;

    const users = await User.find({ _id: { $nin: [...swipedUserIds, userId] } });
    res.json(users);
});

app.post('/swipe', async (req, res) => {
    const { userId, swipedUserId, action } = req.body; // action: 'left' or 'right'

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.swipedUsers.push(swipedUserId);
    await user.save();

    if (action === 'right') {
        const swipedUser = await User.findById(swipedUserId);

        // Check if swipedUser also swiped right on this user
        if (swipedUser.swipedUsers.includes(userId)) {
            user.matchedUsers.push(swipedUserId);
            swipedUser.matchedUsers.push(userId);

            await user.save();
            await swipedUser.save();

            // Save match data
            await Match.create({ userId, matchedUserId: swipedUserId, status: 'matched' });
            return res.json({ message: 'It\'s a match!' });
        }
    }

    res.json({ message: 'Swipe recorded' });
});

app.get('/matches', async (req, res) => {
    const { userId } = req.query;

    try {
        const user = await User.findById(userId).populate({
            path: 'matchedUsers', // This should match the field name in the schema
            select: 'name profilePicture bio _id', // Include only necessary fields
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.matchedUsers);
    } catch (error) {
        console.error('Error fetching matched users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/users/:id/follow', async (req, res) => {
    const { id } = req.params; // The user to be followed
    const { userId } = req.body; // The current user (logged-in)
  
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
  
      if (!user.followers.includes(userId)) {
        user.followers.push(userId);
        currentUser.following.push(id);
  
        await user.save();
        await currentUser.save();
  
        res.status(200).json({ message: 'Followed successfully' });
      } else {
        res.status(400).json({ message: 'Already following' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.post('/api/users/:id/unfollow', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
  
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
  
      user.followers = user.followers.filter(follower => follower.toString() !== userId);
      currentUser.following = currentUser.following.filter(follow => follow.toString() !== id);
  
      await user.save();
      await currentUser.save();
  
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.get('/api/users/:id/follow-status', async (req, res) => {
    const { id } = req.params; // Profile user ID
    const { currentUser } = req.query; // Logged-in user ID
  
    try {
      const user = await User.findById(id);
      const isFollowing = user.followers.includes(currentUser);
      res.status(200).json({ isFollowing });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
