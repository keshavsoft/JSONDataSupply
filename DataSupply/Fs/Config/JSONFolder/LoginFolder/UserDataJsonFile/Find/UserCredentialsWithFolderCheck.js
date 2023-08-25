let CommonFromFromJson = require("../PullDataFromFile/FromJson")
let CommonCheck = require("../../../DataPkAsFolder/Check");

let StartFunc = ({ inUserName, inPassWord }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    localCommonFromJson = CommonFromFromJson.StartFunc();

    LocalReturnData = { ...localCommonFromJson };
    LocalReturnData.KTF = false;

    if (localCommonFromJson.KTF === false) {
        return LocalReturnData;
    };

    if ("JsonData" in localCommonFromJson === false) {
        LocalReturnData.KReason = "JsonData: not found in UserDataJsonFilePath!";
        return LocalReturnData;
    };

    let LocalValuesArray = Object.values(localCommonFromJson.JsonData.data);

    const search = element => element.UserName === inUserName && element.PassWord === inPassWord;
    let LocalFindIndex = LocalValuesArray.findIndex(search);

    if (LocalFindIndex === -1) {
        LocalReturnData.KReason = "UserName and password not found..";
        return LocalReturnData;
    };

    let LocalDataPkNeeded = Object.keys(localCommonFromJson.JsonData.data)[LocalFindIndex];

    let LocalFromCheck = CommonCheck.ForExistence({ inDataPK: LocalDataPkNeeded });

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.kPK = parseInt(LocalDataPkNeeded);
    LocalReturnData.DataPkFolderFound = true;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

module.exports = { StartFunc };