let CommonPullData = require("../PullData/FromJson");
let CommonPushData = require("../PushData/ToJsonFile");
//let CommonPushData = require("../../../../../DataSupply/Fs/LoginFolder/UserDataJson/PushData/ToJsonFile");
let CommonFind = require("../Find/InJson");
let CommonUserDataJson = require("../../UserDataJson/Find/UserNameAndPassword");

let StartFunc = async ({ inUserName, inPassWord, inFirmName }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    try {
        let LocalFromCommonFind = await CommonFind.StartFunc({ inUserName, inPassWord, inFirmName });

        if (LocalFromCommonFind.KTF) {
            LocalReturnData.KReason = LocalFromCommonFind.KReason;
            return await LocalReturnData;
        };

        let LocalFromCommonUserDataJson = await CommonUserDataJson.StartFunc({ inUserName, inPassWord });

        if (LocalFromCommonUserDataJson.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonUserDataJson.KReason;
            return await LocalReturnData;
        };

        let LocalUserPK = LocalFromCommonUserDataJson.kPK;
        let LocalOriginalData = await CommonPullData.AsAsync();
        let LocalAlterdData = JSON.parse(JSON.stringify(LocalOriginalData));

        LocalAlterdData[LocalUserPK] = {
            UserName: inUserName,
            PassWord: inPassWord,
            ConnectedDatas: {}
        };

        LocalAlterdData[LocalUserPK].ConnectedDatas[LocalUserPK] = {
            FirmName: inFirmName
        };

        let LocalFromPush = await CommonPushData.StartFunc({
            inOriginalData: LocalOriginalData,
            inDataToUpdate: LocalAlterdData
        });

        console.log('LocalFromPush : error : ', LocalFromPush);

    } catch (error) {
        console.log('DataSupply : error : ', error);
        LocalReturnData.KReason = error;
        return await LocalReturnData;
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };