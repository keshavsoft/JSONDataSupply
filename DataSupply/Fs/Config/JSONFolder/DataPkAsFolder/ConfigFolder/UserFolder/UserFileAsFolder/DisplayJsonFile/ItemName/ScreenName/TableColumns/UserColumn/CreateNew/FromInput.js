let CommonFromPushData = require("../../../../../PushDataToFile/FromInput");
let CommonCheck = require("../CheckDataAttribute");
let CommonMockAllow = require("../../../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inDataAttribute }) => {
    let LocalinDataPK = inDataPK;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromCheck = CommonCheck.StartFuncNoSync({
        inFolderName,
        inFileNameOnly,
        inItemName,
        inScreenName,
        inDataPK: LocalinDataPK,
        inDataAttribute
    });

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));

    let LocalTableColumns = LocalNewData[LocalItemName][LocalScreenName].TableColumns;
    let CommonTableColumn = require("../../../../../../../../../../../../../Fix/Json/TableColumn.json");

    CommonTableColumn.DataAttribute = inDataAttribute;
    CommonTableColumn.DisplayName = inDataAttribute;
    
    LocalTableColumns.push(CommonTableColumn);

    LocalFromUpdate = CommonFromPushData.StartFuncNoSync({
        inFolderName,
        inFileNameWithExtension: `${inFileNameOnly}.json`,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromCheck.JsonData
    });

    //console.log("LocalFromUpdate : ", LocalFromUpdate);

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey = "Keshav91") {
        let LocalMockData = require("./FromInput.json");
        let LocalFromStart = StartFunc({ ...LocalMockData });
        console.log("LocalFromStart : ", LocalFromStart);
    };
};

module.exports = {
    StartFunc
};