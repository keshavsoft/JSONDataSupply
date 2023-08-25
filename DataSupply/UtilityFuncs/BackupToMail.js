const nodemailer = require("nodemailer");
let path = require("path");

require("dotenv").config();

var mailOptions = {
    from: "nknnkumar@live.com",
    to: "",
    subject: "Click to Verify",
    text: "",
};

exports.SendEmail = async ({ inUserName, inJWToken, inToEmail }) => {
    // Generate SMTP service account from ethereal.email
    //   let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    if (("KS_EMAIL_PUBLIC" in process.env) === false) {
        return await { KSClientError: true, KError: "Email pass not found!" };
        //reject({ KSClientError: true, KError: "Email pass not found!" });
    };

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
    // console.log("pathParts : ", pathParts);
    mailOptions.to = inToEmail;
    //mailOptions.text = inJWToken;
    //mailOptions.text = `http://localhost:4148/JsonDemo/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
    if (process.env.NODE_ENV !== "production") {
        mailOptions.text = `http://localhost:4119/${LocalPublicPath}/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
    } else {
        mailOptions.text = `http://${pathParts[pathParts.length - 1]}/${LocalPublicPath}/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
    };

    let info = await transportLive.sendMail(mailOptions);

    console.log('Message sent successfully!');
    // console.log(nodemailer.getTestMessageUrl(info));
    transportLive.close();

    if (info.response) {
        return await { KTF: true };
      //  reject({ KError: error });
    } else {
        return await { KTF: false };
       // resolve({ KTF: true });
    };

    // only needed when using pooled connections
    
}

// main().catch(err => {
//     console.error(err.message);
//     process.exit(1);
// });