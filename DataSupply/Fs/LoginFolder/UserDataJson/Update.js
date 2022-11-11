const fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonPullData = require("./PullData/FromFile");
let CommonPushData = require("./PushData/ToJsonFile");

let EmailSent = async ({ inUserPk }) => {
    let LocalFromCommonPullData = await CommonPullData.StartFunc();

    if (LocalFromCommonPullData.KTF) {
        let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonPullData.JsonData));

        if (inUserPk in LocalNewData.data) {
            LocalNewData.data[inUserPk].SentEmailForVerification = {
                Sent: true,
                KDT: new Date()
            };

            let LocalFromCommonPushData = await CommonPushData.StartFunc({
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalFromCommonPullData.JsonData
            });
        };
    };
};

let SetupDone = async ({ inUserPk }) => {
    let LocalFromCommonPullData = await CommonPullData.StartFunc();

    if (LocalFromCommonPullData.KTF) {
        let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonPullData.JsonData));

        if (inUserPk in LocalNewData.data) {
            LocalNewData.data[inUserPk].SetupDone = {
                Sent: true,
                KDT: new Date()
            };

            let LocalFromCommonPushData = await CommonPushData.StartFunc({
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalFromCommonPullData.JsonData
            });
        };
    };
};

let SetupDone_11nov2022 = ({ inUserPk }) => {
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