let CommonConfigFolder = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PushData/FromInput");
let CommonConfigFolderReturnDataJsonFile = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/ScreenName/PushData/FromInput");

let CommonMockAllow = require("../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileName, ItemName, NewScreenName, inDataPK }) => {
    let LocalFileName = FileName;

    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        inFolderName: FolderName,
        inFileNameOnly: LocalFileName,
        inItemName: ItemName,
        inScreenName: NewScreenName,
        inDataPK
    });

    let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
        inFolderName: FolderName,
        inFileNameOnly: LocalFileName,
        inItemName: ItemName,
        inScreenName: NewScreenName,
        inDataPK
    });

    return [localFromConfig, localFromConfigReturnData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K04") {
        let LocalMockData = require("./CreateScreenMock.json");

        let LocalFrom = StartFunc({
            ...LocalMockData,
            inDataPK: CommonMockAllow.DataPK
        });

        console.log("LocalFrom : ", LocalFrom[0]);
    };
};

module.exports = { StartFunc };