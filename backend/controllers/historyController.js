const History = require('../models/History');

// Get all history
exports.getAllHistory = async (req, res) => {
  try {
    const history = await History.find()
      .populate('userId', 'name')
      .sort({ claimedAt: -1 })
      .limit(50);
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's history
exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId })
      .populate('userId', 'name')
      .sort({ claimedAt: -1 });
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
