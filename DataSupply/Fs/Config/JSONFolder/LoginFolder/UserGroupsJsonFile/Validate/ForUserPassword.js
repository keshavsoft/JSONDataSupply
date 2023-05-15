let CommonFromJson = require("../PullDataFromFile/FromJson");
let CommonFrom = require("../../UserDataJsonFile/Find/Find")

let StartFunc = ({ inUserName, inPassWord }) => {

    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };
    let LocalCommonFromJson = CommonFromJson.StartFunc();

    if (LocalCommonFromJson.KTF === false) {
        LocalReturnData.KReason = LocalCommonFromJson.KReason;

        return LocalReturnData;
    };

    let LocalJsonData = LocalCommonFromJson.JsonData;

    let LocalFind = Object.values(LocalJsonData).find((obj) => {
        return obj.UserName === inUserName && obj.PassWord === inPassWord;
    });

    let LocalKeyNeeded = Object.keys(LocalFind.ConnectedDatas)[0];
    console.log("LocalKeyNeeded : ", LocalKeyNeeded);
    let commonFromFind = CommonFrom.StartFunc({ inDataPK: LocalKeyNeeded });

    if (commonFromFind.KTF === false) {
        LocalReturnData.KReason = commonFromFind.KReason
        return LocalReturnData;
    };

    LocalReturnData.kPK = LocalKeyNeeded;
    LocalReturnData.KTF = true

    return LocalReturnData;
};

let mockFunc = () => {
    let LocalFrom = StartFunc({
        inUserName: "JASTI", inPassWord: "JASTI",
        inFirmName: "KeshavSoft"
    });
    console.log("LocalFrom ", LocalFrom);
};

// mockFunc();

module.exports = { StartFunc };