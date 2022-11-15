let CommonJWt = require("../../common/Jwt/Email");
let CommonCheck = require("../Fs/LoginFolder/UserDataJson/Find/UserName");
let CommonFromTemplate = require("../Fs/LoginFolder/Admin/Setup/FromTemplate");
let CommonUpdate = require("../Fs/LoginFolder/Admin/Update");
let CommonBasic = require("../Fs/LoginFolder/Admin/Setup/Basic");
let CommonBasicFromTemplates = require("../Fs/LoginFolder/Admin/Setup/BasicFromTemplates");

let StartFunc = async ({ inUserName, inEmail, inJWToken }) => {
    let LocalReturnData = { KTF: false };
    let LocalFromVerifyToken;
    let LocalFromCommonCheck;
    let LocalFromCommonUserFuncs;
    let LocalFromUpdate;

    LocalFromVerifyToken = await CommonJWt.VerifyToken({ inUserName, inEmail, inKToken: inJWToken });
    if (LocalFromVerifyToken) {
        LocalFromCommonCheck = await CommonCheck.StartFunc({ inUserName });

        if (LocalFromCommonCheck.KTF) {
            LocalFromCommonUserFuncs = await CommonBasicFromTemplates.StartFunc({ inUserPK: LocalFromCommonCheck.kPK });

            if (LocalFromCommonUserFuncs.KTF) {
                LocalFromUpdate = CommonUpdate.SetupDone({ inUserPk: LocalFromCommonCheck.kPK });

                LocalReturnData.KTF = true;
            } else {
                LocalReturnData.SetupDone = true;

                // if (LocalFromCommonUserFuncs.SetupDone) {

                // };
            };
        };
    };

    return await LocalReturnData;
};

let FromTemplate = async ({ inUserName, inEmail, inJWToken }) => {
    let LocalReturnData = { KTF: false };
    let LocalFromVerifyToken;
    let LocalFromCommonCheck;
    let LocalFromCommonUserFuncs;

    LocalFromVerifyToken = await CommonJWt.VerifyToken({ inUserName, inEmail, inKToken: inJWToken });

    if (LocalFromVerifyToken) {
        LocalFromCommonCheck = await CommonCheck.ForUserNameReturnPk({ inUserName });

        if (LocalFromCommonCheck.KTF) {
            LocalFromCommonUserFuncs = await CommonFromTemplate.StartFunc({ inUserPK: LocalFromCommonCheck.kPK });

            if (LocalFromCommonUserFuncs.KTF) {
                LocalReturnData.KTF = true;
            };
        };
    };

    return await LocalReturnData;
};

module.exports = {
    StartFunc,
    FromTemplate
};