const Twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = Twilio(accountSid, authToken);

module.exports = {
    sendMessage: async function (message, to) {
        try {
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
