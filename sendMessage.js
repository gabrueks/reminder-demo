const Twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(process.env)

module.exports = {
    sendMessage: async function (message, to) {
        try {
            const twilioClient = Twilio("AC9a502b3b0913e0ab4f2c0c9c1eb0349f", "05a06d0fcf42a760a551e03a0e7e315d");

            await twilioClient
            .messages
            .create({
                body: message,
                from: 'whatsapp:+18444314315',
                to: `whatsapp:+55${to}`
            });
        } catch (err) {
            console.log(err);
        }
    }
}
