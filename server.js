const express = require('express');
const { mongo } = require('mongoose');
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');
require('dotenv').config();
//Routes
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

app.use(cors());
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.send('This is a string output from the API');
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});