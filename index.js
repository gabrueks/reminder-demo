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
    console.log(req)
    const message = "12-05-2022 / 16:50 / sim / Mensagem de teste";
    const splitedMessage = req.body.Body.split(" / ");
    console.log(splitedMessage)
    const date = new Date(`${splitedMessage[0]} ${splitedMessage[1]}`);
    new CronJob(date, function(){
        sendMessage(splitedMessage[3], "13991787399");
        console.log('You will see this message every second');
    }, null, true, "America/Sao_Paulo");
    res.send("OK");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
