let CommonFromJson = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inUserName, inPassWord, inFirmName }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };
    let LocalCommonFromJson = CommonFromJson.StartFunc();

    if (LocalCommonFromJson.KTF === false) {
        LocalReturnData.KReason = LocalCommonFromJson.KReason;

        return LocalReturnData;
    };

    let LocalJsonData = LocalCommonFromJson.JsonData;

    console.log("2222222", inUserName, inPassWord);

    let LocalFind = Object.values(LocalJsonData).find((obj) => {

        console.log("obj", obj.UserName, obj.PassWord, obj.UserName === inUserName);

        //    return obj.UserName === inUserName && obj.PassWord === inPassWord && obj.ConnectedDatas === inFirmName;
        return obj.UserName === inUserName && obj.PassWord === inPassWord;
    });

    let LocalKeyNeeded;

    Object.entries(LocalFind.ConnectedDatas).forEach(
        ([key, value]) => {
            if (value.FirmName === inFirmName) {
                LocalKeyNeeded = key;
            }
        }
    );

    console.log("hhh", LocalKeyNeeded);

};

module.exports = { StartFunc };