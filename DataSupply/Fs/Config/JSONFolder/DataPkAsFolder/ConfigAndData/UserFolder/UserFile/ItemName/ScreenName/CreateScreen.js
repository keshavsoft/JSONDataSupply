let CommonConfigFolder = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PushData/FromInput");
let CommonConfigFolderReturnDataJsonFile = require("../../../../../ConfigFolder/UserFolder/UserFileAsFolder/ReturnDataJsonFile/ItemName/ScreenName/PushData/FromInput");

let CommonMockAllow = require("../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileName, ItemName, NewScreenName, DataPK }) => {
    let LocalFolderName = FolderName;
    let LocalFile = FileName;
    let LocalItemName = ItemName;
    let LocalNewScreenName = NewScreenName;
    let LocalDataPK = DataPK;


    let localFromConfig = CommonConfigFolder.StartFuncNoSync({
        FolderName: LocalFolderName,
        FileName: LocalFile,
        ItemName: LocalItemName,
        NewScreenName: LocalNewScreenName,
        DataPk: LocalDataPK
    });

    let localFromConfigReturnData = CommonConfigFolderReturnDataJsonFile.StartFuncNoSync({
        inFolderName: LocalFolderName,
        inFileNameOnly: LocalFile,
        inItemName: LocalItemName,
        inScreenName: LocalNewScreenName,
        inDataPK: LocalDataPK
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