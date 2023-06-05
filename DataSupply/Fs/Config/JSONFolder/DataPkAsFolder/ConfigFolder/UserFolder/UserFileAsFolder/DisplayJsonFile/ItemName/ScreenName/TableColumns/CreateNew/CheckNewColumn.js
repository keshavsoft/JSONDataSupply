let CommonCheckTableColumns = require("../CheckTableColumns");
let CommonMockAllow = require("../../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inNewColumnName }) => {
    let LocalinDataPK = inDataPK;

    let LocalFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenName = inScreenName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromCheck = CommonCheckTableColumns.StartFuncNoSync({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenName,
        inDataPK: LocalinDataPK
    });

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTF === false) {
        LocalReturnObject.KTFFromRoot = false;
        return LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));
    let LocalFilterColumn = LocalNewData[LocalinItemName][LocalinScreenName].TableColumns.filter(element => {
        return element.DataAttribute === inNewColumnName;
    });

    LocalReturnObject.KTFColumnFound = false;

    if (LocalFilterColumn.length > 0) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KTFColumnFound = true;
    };

    return LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey = "K9") {
        let LocalMockData = require("./CheckNewColumn.json");
        let LocalFromStart = StartFunc(LocalMockData);
        console.log("LocalFromStart : ", LocalFromStart);
    };
}

module.exports = {
    StartFunc
};