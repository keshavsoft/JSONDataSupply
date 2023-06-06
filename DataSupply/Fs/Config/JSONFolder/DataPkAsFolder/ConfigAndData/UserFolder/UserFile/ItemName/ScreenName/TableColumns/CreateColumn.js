// let CommonConfigFolder = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/ColumnName/PushData/FromInput");
let CommonConfigFolder = require("../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/CreateNew/InsertNewColumn");

let CommonMockAllow = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileName, inItemName, inScreenName, inDataPK, inNewColumnName }) => {
    let LocalFileName = inFileName;
    
    let localFromConfig = CommonConfigFolder.StartFunc({
        inFolderName,
        inFileNameOnly: LocalFileName,
        inItemName,
        inScreenName,
        inNewColumnName,
        inDataPK
    });

    return [localFromConfig];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "s1") {
        let LocalMockData = require("./CreateColumnMock.json");

        let LocalFrom = StartFunc(LocalMockData);

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };