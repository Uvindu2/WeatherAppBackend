const express = require("express");
const Weather = require('../model/weather');
const router = express.Router();

const backendApiKey = process.env.API_KEY;

// Define a middleware to verify API key
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['apikey'];


    if (apiKey && apiKey === backendApiKey) {
        console.log("Authorized User")
        next(); // Proceed to the next middleware
    } else {
        console.log("Unauthorized User")
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Middleware
router.use(express.json());


router.post('/save', verifyApiKey, async (req, res) => {
    try {
        const weatherDetails = req.body;
        await Weather.insertMany(weatherDetails);
        res.status(201).json({ message: 'Weather data saved successfully' });
    } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function deleteAllDataBy24Hours() {
    try {
        await Weather.deleteMany({});
        console.log('All data removed successfully');
    } catch (error) {
        console.error('Internal server error:', error);
    }
    setTimeout(deleteAllDataBy24Hours, 24 * 60 * 60 * 1000);
};

router.get('/', async (req, res) => {
    try {
        const weather = await Weather.find().sort({ timestamp: -1 }).limit(25);
        if (!weather || weather.length === 0) {
            throw Error('No items');
        }
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const weather = await Weather.find().sort({ timestamp: -1 })
        if (!weather || weather.length === 0) {
            throw Error('No items');
        }
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

deleteAllDataBy24Hours()

module.exports = router;