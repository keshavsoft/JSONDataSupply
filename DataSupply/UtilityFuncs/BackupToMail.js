const nodemailer = require("nodemailer");
let path = require("path");

var transportLive = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "nknnkumar@live.com",
        pass: "aecwajbiacwtbozl"
    }
});

var mailOptions = {
    from: "nknnkumar@live.com",
    to: "",
    subject: "Click to Verify",
    text: "",
};

exports.SendEmail = ({ inUserName, inJWToken, inToEmail }) => {
    return new Promise((resolve, reject) => {
        const LocalCurrentPath = path.resolve(__dirname, '../');
        //const pathParts = LocalCurrentPath.split(path.sep);
        const LocalRootPath = path.resolve("./");
        const pathParts = LocalRootPath.split(path.sep);

        //console.log("pathParts:", pathParts, path.resolve("./"));
        //  console.log("pathParts:", pathParts, LocalRootPath);

        mailOptions.to = inToEmail;
        //mailOptions.text = inJWToken;
        //mailOptions.text = `http://localhost:4148/JsonDemo/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        if (process.env.NODE_ENV === "development") {
            mailOptions.text = `http://localhost:4121/JSONUserUi/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        } else {
            mailOptions.text = `http://${pathParts[pathParts.length - 1]}/JSONUserUi/Html/pages/EmailValidation.html?UserName=${inUserName}&FromEmail=${inToEmail}&KToken=${inJWToken}`;
        };

        transportLive.sendMail(mailOptions, function (error, response) {
            console.log("error:", error);

            if (error) {
                reject({ KError: error });
            } else {
                resolve({ KTF: true });
            }
        });
    });
};
