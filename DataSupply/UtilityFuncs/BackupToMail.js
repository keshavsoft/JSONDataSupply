const nodemailer = require("nodemailer");
let path = require("path");

var mailOptions = {
    from: "nknnkumar@live.com",
    to: "",
    subject: "Click to Verify",
    text: "",
};

exports.SendEmail = ({ inUserName, inJWToken, inToEmail }) => {
    return new Promise((resolve, reject) => {
        let LocalPublicPath = process.env.KS_EMAIL_PUBLIC;

        var transportLive = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: "nknnkumar@live.com",
                pass: process.env.KS_EMAIL_PASS
            }
        });

        const LocalRootPath = path.resolve("./");
        const pathParts = LocalRootPath.split(path.sep);
        console.log("pathParts : ", pathParts);
        mailOptions.to = inToEmail;
        //mailOptions.text = inJWToken;
        //mailOptions.text = `http://localhost:4148/JsonDemo/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        if (process.env.NODE_ENV !== "production") {
            mailOptions.text = `http://localhost:4119/${LocalPublicPath}/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        } else {
            mailOptions.text = `http://${pathParts[pathParts.length - 1]}/${LocalPublicPath}/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        };

        transportLive.sendMail(mailOptions, function (error, response) {
            if (error) {
                reject({ KError: error });
            } else {
                resolve({ KTF: true });
            }
        });
    });
};
