const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  profilePicture: String,
  preferences: {
    travelType: { type: String, enum: ['family', 'genZ'], default: 'family' }
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  pastTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  createdTours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OpenTour' }],
  joinedTours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OpenTour' }],
  swipedUsers: { type: Array, default: [] }, // Array of user IDs the user has swiped
  matchedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User model
],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// Password hash middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
