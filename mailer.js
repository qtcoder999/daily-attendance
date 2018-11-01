const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'qtparas@gmail.com',
        pass: '12345',
    },
});
const mailOptions = {
    from: 'qtparas@gmail.com',
    to: 'ankitaggarwal648@gmail.com',
    subject: 'hello world!',
    html: 'hello world!', //Avantika
};
transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
});