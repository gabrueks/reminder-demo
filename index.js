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
    let hours = splitedMessage[1];
    if (process.env.PORT) {
        hours = `${Number(splitedMessage[1].substring(0, 2)) + 3}:${Number(splitedMessage[1].substring(3, 5))}`;
    }
    const date = new Date(`${splitedMessage[0]} ${hours}`);
    new CronJob(date, function() {
        sendMessage(splitedMessage[3], req.body.to);
    }, null, true, "America/Sao_Paulo");
    res.send("OK");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});
