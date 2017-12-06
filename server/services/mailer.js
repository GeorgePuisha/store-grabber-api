const nodemailer = require("nodemailer");
const amqp = require("../controllers/amqp");
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

const createText = (oldPrice, newPrice, productName) => {
    return mail.text.greeting + mail.text.intro + productName + mail.text.price + mail.text.old + oldPrice + mail.text.new + newPrice + mail.text.end;
};

const sendEmail = (data) => {
    const text = createText(data.oldPrice, data.newPrice, data.product.name);
    transporter.sendMail(mailOptions(data.user.email, mail.subject, text));
};

const emailDelivery = () => {
    amqp.getFromQueue(sendEmail);
};

module.exports.emailDelivery = emailDelivery;