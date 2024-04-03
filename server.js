const express=require('express');
const { mongo } = require('mongoose');
const app=express();
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://admin:Uvindu8800@cluster0.ywbansd.mongodb.net/WeatherMap?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected!'));

    
app.get('/', (req, res) => {
    res.send('This is a string output from the API');
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});