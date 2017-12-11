const nodemailer = require("nodemailer");
const amqp = require("../controllers/amqp");
const redis = require("../controllers/redis");
const mail = require("./mail");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = (to, subject, text) => {
    return {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };
};

const readCurrencyAndRate = (email) => {
    return new Promise((resolve, reject) => {
        redis.hgetall(email, (err, currencyData) => {
            resolve(currencyData);
        });
    });
};

const convertPrice = (price, rate) => {
    return (parseFloat(price) / parseFloat(rate)).toFixed(2).toString();
};

const createText = (currencyData, data) => {
    const oldPrice = convertPrice(data.oldPrice, currencyData.rate);
    const newPrice = convertPrice(data.newPrice, currencyData.rate);
    return mail.text.greeting + mail.text.intro + data.product.name + mail.text.price +
        mail.text.old + oldPrice + " " + currencyData.currency +
        mail.text.new + newPrice + " " + currencyData.currency +
        mail.text.end;
};

const sendEmail = (data) => {
    readCurrencyAndRate(data.user.email).then((currencyData) => {
        const text = createText(currencyData, data);
        transporter.sendMail(mailOptions(data.user.email, mail.subject, text));
    });
};

const emailDelivery = () => {
    amqp.getFromLetterQueue(sendEmail);
};

module.exports.emailDelivery = emailDelivery;