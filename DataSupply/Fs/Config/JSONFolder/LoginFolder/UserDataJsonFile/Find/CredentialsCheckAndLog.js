let CommonFromFromJson = require("../PullDataFromFile/FromJson")
let CommonCheck = require("../../../DataPkAsFolder/Check");
let CommonMock = require("../../../../../../MockAllow.json");
//let CommonItemNameAsArray = require("../../../DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PushData/ItemNameInsert/ItemNameAsArray");
let CommonCreateFileOnly = require("../../../DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/PushDataToFile/CreateFileOnly");

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

    LocalFuncToWebSocketAsFile({ inDataPK: LocalDataPkNeeded });

    return LocalReturnData;
};

let LocalFuncToWebSocket = ({ inDataPK }) => {
    let LocalFolderName = "ForChat";
    //let LocalFileNameOnly = "ConnectedClients";

    let LocalFileNameOnly = "ConnectedClients";

    let LocalItemName = process.env.UUID;

    CommonItemNameAsArray.StartFuncNoAsync({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName: LocalItemName, inDataPK
    });
};

let LocalFuncToWebSocketAsFile = ({ inDataPK }) => {
    let LocalFolderName = "ForChat";
    //let LocalFileNameOnly = "ConnectedClients";

    let LocalFileNameOnly = process.env.UUID;

    // let LocalItemName = process.env.UUID;

    CommonCreateFileOnly.StartFunc({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inDataPK
    });
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