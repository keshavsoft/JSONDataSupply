let CommonFromPushData = require("../../../../PushDataToFile/FromInput");
let CommonCheckTableColumns = require("./CheckNewColumn");
let CommonMockAllow = require("../../../../../../../../../../../../MockAllow.json");
let CommonSupplyJson = require("../../../../../../../../../../../../Fix/Json/SupplyJson");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inNewColumnName }) => {
    let LocalinDataPK = inDataPK;

    let LocalFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenName = inScreenName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromCheck = CommonCheckTableColumns.StartFunc({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenName,
        inDataPK: LocalinDataPK,
        inNewColumnName
    });

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTFColumnFound) {
        LocalReturnObject.KReason = "ColumnName already found!";
        return LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));
    let LocalNewColumn = CommonSupplyJson.TableColumn();

    LocalNewColumn.DataAttribute = inNewColumnName;
    LocalNewColumn.DisplayName = inNewColumnName;
    
    LocalNewData[LocalinItemName][LocalinScreenName].TableColumns.push(LocalNewColumn);

    LocalFromUpdate = CommonFromPushData.StartFuncNoSync({
        inFolderName: LocalFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromCheck.JsonData
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey = "K5") {
        let LocalMockData = require("./InsertNewColumnMock.json");
        let LocalFromStart = StartFunc(LocalMockData);
        console.log("-------- : ", LocalFromStart);
    };
}

module.exports = {
    StartFunc
};