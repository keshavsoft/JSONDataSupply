let CommonConfigFolder = require("../../../ConfigFolder/UserFolder/UserFileAsFolder/CreateFileAsFolder/FromInput");

let CommonDataFolder = require("../../../DataFolder/UserFolder/UserJsonFile/PushDataToFile/FromInput");

let CommonMockAllow = require("../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ FolderName, NewFileName, DataPK }) => {
    let LocalFolderName = FolderName;
    let LocalFileNameOnly = path.parse(NewFileName).name;
    let localDataPK = DataPK;

    let localFromConfig = CommonConfigFolder.StartFunc({
        FolderName: LocalFolderName,
        NewFileName: LocalFileNameOnly,
        DataPK: localDataPK
    });

    let localFromData = CommonDataFolder.CreateFileWithData({
        inFolderName:LocalFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inData: {},
        inDataPK:localDataPK
    });

    return [localFromConfig, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "S1") {
        let LocalFrom = StartFunc({
            FolderName: "SimpleQuestions",
            NewFileName: "RRWWW",
            DataPK: 19
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };