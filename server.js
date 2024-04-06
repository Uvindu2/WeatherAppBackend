const express = require('express');
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather')

const mongoDBUrl = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());

app.use(cors());
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.send('This is a string output from the API');
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});