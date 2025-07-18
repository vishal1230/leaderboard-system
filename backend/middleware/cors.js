const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://687a9fe5e8193710114d9ca1--leaderboard-system-fe.netlify.app/'] 
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
