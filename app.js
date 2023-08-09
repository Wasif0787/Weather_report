const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
    const query = req.body.cityName;
    console.log(query);
    const appid = "73da9ff48721eecbadc9eb57c1253749"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appid
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is " + weatherDescription + "</p>")
            res.write("<h1>The temperature is " + temp + " degree Celcius</h1>");
            res.write("<img src=" + imageUrl + ">")
            res.send();
        })
    })
})

app.listen(4000, function () {
    console.log("Server is running at port 4000");
});