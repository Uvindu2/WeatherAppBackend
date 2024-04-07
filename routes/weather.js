const express = require("express");
const Weather = require('../model/weather');
const router = express.Router();

const backendApiKey = process.env.API_KEY;
// Middleware
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['apikey'];


    if (apiKey && apiKey === backendApiKey) {
        console.log("Authorized User")
        next();
    } else {
        console.log("Unauthorized User")
        res.status(401).json({ error: 'Unauthorized' });
    }
};

router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather data operations
 */

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get latest weather data
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 */
router.get('/', async (req, res) => {
    try {
        const weather = await Weather.find().sort({ _id: -1 }).limit(25);
        if (!weather || weather.length === 0) {
            throw Error('No weather data found');
        }
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/weather/all:
 *   get:
 *     summary: Get all weather data
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 */
router.get('/all', async (req, res) => {
    try {
        const weather = await Weather.find().sort({ timestamp: -1 })
        if (!weather || weather.length === 0) {
            throw Error('No weather data found');
        }
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/weather/save:
 *   post:
 *     summary: Save weather data
 *     tags: [Weather]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weather'
 *     responses:
 *       201:
 *         description: Weather data saved successfully
 *       500:
 *         description: Internal server error
 */
router.post('/save', verifyApiKey, async (req, res) => {
    try {
        const weatherDetails = req.body;
        await Weather.insertMany(weatherDetails);
        res.status(201).json({ message: 'Weather data saved successfully' });
        console.log("Weather data saved successfully");
    } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.log("Internal server error :"+error);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       properties:
 *         district:
 *           type: string
 *         humidity:
 *           type: number
 *         temperature:
 *           type: number
 *         pressure:
 *           type: number
 *         weatherCondition:
 *           type: string
 */

// Function to delete all data from database every 24 hours
async function deleteAllDataBy24Hours() {
    try {
        await Weather.deleteMany({});
        console.log('All weather data removed successfully');
    } catch (error) {
        console.error('Error deleting weather data:', error);
    }
    // Schedule the function to run every 24 hours
    setTimeout(deleteAllDataBy24Hours, 24 * 60 * 60 * 1000);
}

// Initialize the function to start deleting data
deleteAllDataBy24Hours();

module.exports = router;