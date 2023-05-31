let CommonConfigFolder = require("../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/PushData/FromInput");
let CommonConfigFolderReturnDataJsonFile = require("../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/PushData/FromInput");

let CommonDataFolder = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");

let CommonMockAllow = require("../../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inFileName, inItemName, inDataPK }) => {
    let LocalFileName = inFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;

    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inDataPK
    });

    let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inDataPK
    });

    let localFromData = CommonDataFolder.StartFuncNoAsync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inDataPK
    });

    return [localFromConfig, localFromConfigReturnData, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav71") {
        let LocalFrom = StartFunc({
            inFolderName: "Masters",
            inFileName: "Items.json",
            inItemName: "ItemNames",
            inDataPK: 416
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };