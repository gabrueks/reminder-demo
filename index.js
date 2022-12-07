const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sendMessage } = require("./sendMessage");

const app = express();
const CronJob = require('cron').CronJob;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/message", (req, res) => {
    const splitedMessage = req.body.Body.split(" / ");
    const date = new Date(`${splitedMessage[0]} ${splitedMessage[1]}`).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    new CronJob(date, function() {
        sendMessage(splitedMessage[3], req.body.to);
    }, null, true, "America/Sao_Paulo");
    res.send("OK");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});
