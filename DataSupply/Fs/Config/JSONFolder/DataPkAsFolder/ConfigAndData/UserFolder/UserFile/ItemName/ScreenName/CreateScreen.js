let CommonConfigFolder = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PushData/FromInput");
let CommonConfigFolderReturnDataJsonFile = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/ScreenName/PushData/FromInput");

let CommonMockAllow = require("../../../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inFileName, inItemName, inScreenName, inDataPK }) => {
    let LocalFileName = inFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;

    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inScreenName,
        inDataPK
    });

    let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inScreenName,
        inDataPK
    });

    return [localFromConfig, localFromConfigReturnData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K04") {
        let LocalMockData = require("./CreateScreenMock.json");

        let LocalFrom = StartFunc(LocalMockData);

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };