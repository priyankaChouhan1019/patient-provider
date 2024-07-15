const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectdb = require("./config/dbConnection");
const authRoutes = require('./routes/userRoutes')

const app = express();

// Connect Database
connectdb();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));