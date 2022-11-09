const fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");

let EmailSent = ({ inUserPk }) => {
    try {
        let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
        let LocalFilePath = `${LocalDataPath}/Login/UserData.json`;
        let LocalUserData = fs.readFileSync(LocalFilePath);
        let LocalUserDataJson = JSON.parse(LocalUserData);

        if (inUserPk in LocalUserDataJson.data) {
            LocalUserDataJson.data[inUserPk].SentEmailForVerification = {
                Sent: true,
                KDT: new Date()
            };

            fs.writeFileSync(LocalFilePath, JSON.stringify(LocalUserDataJson));
        };
    } catch (error) {
        console.log("error : ", error);
    };
};

let SetupDone = ({ inUserPk }) => {
    let LocalReturnObject = { KTF: false };

    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    let LocalFilePath = `${LocalDataPath}/Login/UserData.json`;
    let LocalUserData = fs.readFileSync(LocalFilePath);
    let LocalUserDataJson = JSON.parse(LocalUserData);

    if (inUserPk in LocalUserDataJson.data) {
        //LocalUserDataJson.data[inUserPk].SentEmailForVerification = true;
        LocalUserDataJson.data[inUserPk].SetupDone = {
            KTF: true,
            KDT: new Date()
        };

        fs.writeFileSync(LocalFilePath, JSON.stringify(LocalUserDataJson));
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

module.exports = { EmailSent, SetupDone };