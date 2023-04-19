let CommonFromFromJson = require("../PullDataFromFile/FromJson")

let StartFunc = ({ inUserName, inPassWord }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    localCommonFromJson = CommonFromFromJson.StartFunc();
    LocalReturnData = { ...localCommonFromJson };

    if (localCommonFromJson.KTF === false) {
        return LocalReturnData;
    };

    if ("JsonData" in localCommonFromJson === false) {
        LocalReturnData.KReason = "JsonData: not found in UserDataJsonFilePath!";
        return LocalReturnData;
    };

    let LocalValuesArray = Object.values(localCommonFromJson.JsonData);
    const search = element => element.UserName === inUserName && element.PassWord === inPassWord;
    let LocalFindIndex = LocalValuesArray.findIndex(search);
    let LocalKeysArray = Object.keys(localCommonFromJson.JsonData);
    LocalReturnData.kPK = LocalKeysArray[LocalFindIndex];

    if (LocalReturnData.kPK > 0) {
        LocalReturnData.KTF = true;
    };
    return LocalReturnData;

};

let mockFunc = () => {
    StartFunc({ inDataPK: "1024" })
};
// mockFunc();


module.exports = { StartFunc };