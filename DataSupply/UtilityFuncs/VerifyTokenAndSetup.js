let CommonJWt = require("../../common/Jwt/Email");
let CommonCheck = require("../Fs/LoginFolder/UserDataJson/Find/UserName");
//let CommonFromTemplate = require("../Fs/Users/Admin/Setup/FromTemplate");
//let CommonUpdate = require("../Fs/Users/Admin/Update");
//let CommonSetupFromTemplate = require("../Fs/Users/Admin/Setup/FromTemplate");

let CommonFromTemplate = require("../Fs/LoginFolder/Admin/Setup/FromTemplate");
let CommonUpdate = require("../Fs/LoginFolder/Admin/Update");

let StartFunc = async ({ inUserName, inEmail, inJWToken }) => {
    console.log("vvvvvvvvvvvvvvvvv");
    let LocalReturnData = { KTF: false };
    let LocalFromVerifyToken;
    let LocalFromCommonCheck;
    let LocalFromCommonUserFuncs;
    let LocalFromUpdate;

    LocalFromVerifyToken = await CommonJWt.VerifyToken({ inUserName, inEmail, inKToken: inJWToken });
    if (LocalFromVerifyToken) {
        LocalFromCommonCheck = await CommonCheck.StartFunc({ inUserName });
        console.log("LocalFromCommonCheck : ", LocalFromCommonCheck);

        if (LocalFromCommonCheck.KTF) {
            //LocalFromCommonUserFuncs = await CommonUserFuncs.Basic({ inUserPK: LocalFromCommonCheck.kPK });
            LocalFromCommonUserFuncs = await CommonFromTemplate.StartFunc({ inUserPK: LocalFromCommonCheck.kPK });
            console.log("LocalFromCommonUserFuncs : ", LocalFromCommonUserFuncs);

            if (LocalFromCommonUserFuncs.KTF) {
                LocalFromUpdate = CommonUpdate.SetupDone({ inUserPk: LocalFromCommonCheck.kPK });

                LocalReturnData.KTF = true;
            } else {
                if (LocalFromCommonUserFuncs.SetupDone) {
                    LocalReturnData.SetupDone = true;
                };
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