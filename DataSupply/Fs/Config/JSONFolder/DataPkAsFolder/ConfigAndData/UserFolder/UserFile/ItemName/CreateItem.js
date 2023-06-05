let CommonConfigFolder = require("../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/PushData/FromInput");
let CommonConfigFolderReturnDataJsonFile = require("../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/PushData/FromInput");

let CommonDataFolder = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/ItemNameOnly");

let CommonMockAllow = require("../../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inFileName, inNewItemName, inDataPK }) => {
    let LocalFileName = inFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;
    let LocalNewItemName = inNewItemName;

    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName: LocalNewItemName,
        inDataPK
    });

    let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName: LocalNewItemName,
        inDataPK
    });

    let localFromData = CommonDataFolder.StartFuncNoAsync({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName: LocalNewItemName,
        inDataPK
    });

    return [localFromConfig, localFromConfigReturnData, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K71") {
        let LocalFrom = StartFunc({
            inFolderName: "Masters",
            inFileName: "Items.json",
            inNewItemName: "ItemNames4",
            inDataPK: 317
        });

        console.log("LocalFrom : ", LocalFrom[2]);
    };
};

module.exports = { StartFunc };