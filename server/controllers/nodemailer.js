const nodemailer = require("nodemailer");
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

const sendEmail = (productInfo, oldPrice, newPrice, email) => {
    const text = createText(oldPrice, newPrice, productInfo.name);
    transporter.sendMail(mailOptions(email, mail.subject, text));
};

module.exports.sendEmail = sendEmail;