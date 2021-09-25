const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const amount = req.body.amountInp;
    const convertFrom = req.body.dropdownF;
    const convertTo = req.body.dropdownT
    const apiKey = "68078b04a231eb1fc0f66a67";
    const url = "https://v6.exchangerate-api.com/v6/" + apiKey + "/pair/" + convertFrom + "/" + convertTo + "/" + "/1";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const priceData = JSON.parse(data);
            const currentRate = priceData.conversion_result;
            var totalPrice = currentRate * amount;
            totalPrice = totalPrice.toFixed(2);
            res.write("<h1>" + convertFrom + " " + amount + "</h1>");
            res.write("<h1>" + convertTo + " " + totalPrice + "</h1>");
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});

// api key
// 68078b04a231eb1fc0f66a67