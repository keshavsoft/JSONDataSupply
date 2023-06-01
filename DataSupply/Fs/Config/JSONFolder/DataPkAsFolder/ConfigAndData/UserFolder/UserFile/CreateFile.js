let CommonConfigFolder = require("../../../ConfigFolder/UserFolder/UserFileAsFolder/CreateFileAsFolder/FromInput");

let CommonDataFolder = require("../../../DataFolder/UserFolder/UserJsonFile/PushDataToFile/FromInput");

let CommonMockAllow = require("../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inNewFileName, inDataPK }) => {
    let LocalFileName = inNewFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;

    let localFromConfig = CommonConfigFolder.StartFunc({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inDataPK
    });

    let localFromData = CommonDataFolder.CreateFileWithData({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inData: {},
        inDataPK
    });

    return [localFromConfig, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav71") {
        let LocalFrom = StartFunc({
            inFolderName: "Masters",
            inFileName: "Items.json",
            inDataPK: 416
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };