const nodemailer = require('nodemailer')

const config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: 'oldroad2022', //註冊的163郵箱賬號
        pass: 'SNRRQHKFKEUNNSFT' //郵箱的授權碼，不是註冊時的密碼,等你開啟的stmp服務自然就會知道了
    }
};

const transporter = nodemailer.createTransport(config);

const NodemailerSend = function (mail) {
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log('mail sent success:', info.response);
    });
};

module.exports = NodemailerSend
