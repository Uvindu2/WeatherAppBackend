const mongoose = require("mongoose")
const weatherSchema = mongoose.Schema({
    district: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    airPressure: {
        type: Number,
        required: true,
    }
});
weatherSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
module.exports = mongoose.model('Weather', weatherSchema);