const nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
        host: 't.pl',
        port: 465,
        secure: true,
        auth: {
            user: 'danielyanko@t.pl',
            pass: 'stud234',
        },
        tls: {
            rejectUnauthorized: false
        }
    })
};