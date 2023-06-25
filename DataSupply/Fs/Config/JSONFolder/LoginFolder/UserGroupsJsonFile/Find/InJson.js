let _ = require("lodash");

let CommonPullData = require("../PullDataFromFile/FromJson");

let StartFunc = ({ inUserName, inPassWord, inFirmName }) => {
    let LocalUserName = inUserName;
    let LocalPassword = inPassWord;
    let LocalFirmName = inFirmName;

    let LocalReturnData = { KTF: false, DirPath: "", FilePath: "", CreatedLog: {} };

    let LocalFromPullData = CommonPullData.StartFunc();
    let LocalFindObject={ "UserName": LocalUserName, "PassWord": LocalPassword };

    let LocalUserKeyNeeded = _.findKey(LocalFromPullData.JsonData,LocalFindObject );

    if (LocalUserKeyNeeded === undefined) {
        LocalReturnData.KReason = `${inUserName} and password not found!`;
        return LocalReturnData;
    };

    let LocalDataPK = _.findKey(LocalFromPullData.JsonData[LocalUserKeyNeeded].ConnectedDatas, { "FirmName": LocalFirmName });

    if (LocalDataPK === undefined) {
        LocalReturnData.KReason = `${inFirmName} not found!`;
        return LocalReturnData;
    };

    LocalReturnData.kPK = LocalDataPK;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

module.exports = { StartFunc };