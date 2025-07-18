const User = require('../models/User');
const History = require('../models/History');

// Get all users with rankings
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Add rank to each user
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    res.json(usersWithRank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const user = new User({ name: name.trim() });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'User with this name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Claim points for user
exports.claimPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update user points
    user.totalPoints += randomPoints;
    await user.save();
    
    // Create history record
    const history = new History({
      userId: user._id,
      userName: user.name,
      pointsAwarded: randomPoints,
      description: `Claimed ${randomPoints} points`
    });
    await history.save();
    
    res.json({
      user,
      pointsAwarded: randomPoints,
      message: `${user.name} claimed ${randomPoints} points!`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
