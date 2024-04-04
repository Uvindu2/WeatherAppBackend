const express = require("express");
const weatherSchema = require("../model/weather");
const Weather = require('../model/weather');
const router = express.Router();


async function generateWeatherData() {
    try {
        const districts = [
            'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara',
            'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya', 'Puttalam',
            'Kurunegala', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
        ];
        const weatherDetails = districts.map(district => {
            const temperature = (Math.random() * 10 + 25).toFixed(2);
            const humidity = (Math.random() * 30 + 60).toFixed(2);
            const airPressure = (Math.random() * 25 + 1000).toFixed(2);

            return {
                temperature,
                humidity,
                airPressure,
                district
            };
        });
        await Weather.insertMany(weatherDetails);
        console.log('Weather data saved successfully for all districts');
    } catch (error) {
        console.log('Internal server error :' + error)
    }
    setTimeout(generateWeatherData, 0.1 * 60 * 1000);
};

async function deleteAllDataBy24Hours() {
    try {
        await Weather.deleteMany({});
        console.log('All data removed successfully');
    } catch (error) {
        console.error('Internal server error:', error);
    }
    setTimeout(deleteAllDataBy24Hours, 1440 * 60 * 1000);
};
generateWeatherData();
deleteAllDataBy24Hours()

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


module.exports = router;