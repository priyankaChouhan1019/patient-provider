const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectdb = require("./config/dbConnection");
const authRoutes = require('./routes/userRoutes')
const otpRoutes = require('./routes/otpRoutes')
const patientDemographicsRoutes = require('./routes/patientRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const allergyRoutes = require('./routes/allergyRoutes');
const submitRoutes = require('./routes/submitRoutes');

require('dotenv').config();


const app = express();

// Connect Database
connectdb();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', patientDemographicsRoutes);
app.use('/api/medication', medicationRoutes); 
app.use('/api/allergy', allergyRoutes); 
app.use('/api', submitRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));