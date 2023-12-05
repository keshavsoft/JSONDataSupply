let CommonFromFromJson = require("../PullDataFromFile/FromJson")
let CommonCheck = require("../../../DataPkAsFolder/Check");
let CommonMock = require("../../../../../../MockAllow.json");
let CommonFirmDetailsJsonFile = require("../../../DataPkAsFolder/FirmDetailsJsonFile/PullDataFromFile/FromJson");

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

    // let LocalFromCheck = CommonCheck.ForExistence({ inDataPK: LocalDataPkNeeded });

    let LocalFromCheck = CommonFirmDetailsJsonFile.StartFunc({ inDataPK: LocalDataPkNeeded });

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.kPK = parseInt(LocalDataPkNeeded);
    LocalReturnData.RedirectPage = LocalFromCheck.JsonData.Firm.Config.Ui.Login.RedirectPage;
    delete LocalReturnData.JsonData;
    // LocalReturnData.JsonData.Firm.Config.Ui.Login.RedirectPage = LocalFromCheck.RedirectPage;
    LocalReturnData.DataPkFolderFound = true;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K24') {
        let LocalMockData = require('./UserCredentialsWithFolderCheck.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };