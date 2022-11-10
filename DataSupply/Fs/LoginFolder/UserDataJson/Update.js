const fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonPullData = require("./PullData/FromFile");
let CommonPushData = require("./PushData/ToJsonFile");

let EmailSent = async ({ inUserPk }) => {
    let LocalFromCommonPullData = CommonPullData.StartFunc();

    if (LocalFromCommonPullData.KTF) {
        let LocalNewData = JSON.parse(JSON.stringify(LocalUserDataJson.JsonData));

        if (inUserPk in LocalNewData) {
            LocalNewData[inUserPk].SentEmailForVerification = {
                Sent: true,
                KDT: new Date()
            };

            let LocalFromCommonPullData = CommonPushData.StartFunc({
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalUserDataJson.JsonData
            });

            console.log("LocalFromCommonPullData : ", LocalFromCommonPullData);
        };
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