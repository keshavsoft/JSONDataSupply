let CommonConfigFolder = require("../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/PushData/FromInput");

// let CommonDataFolder = require("../../../DataFolder/UserFolder/UserJsonFile/PushDataToFile/FromInput");

let CommonMockAllow = require("../../../../../../../../MockAllow.json");
let path = require("path");

let StartFunc = ({ inFolderName, inFileName, inItemName, inDataPK }) => {
    let LocalFileName = inFileName;
    let LocalFileNameOnly = path.parse(LocalFileName).name;

    let localFromConfig = CommonConfigFolder.StartFunc({
        inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inItemName,
        inDataPK
    });

    // let localFromData = CommonDataFolder.CreateFileWithData({
    //     inFolderName,
    //     inFileNameOnly: LocalFileNameOnly,
    //     inData: {},
    //     inDataPK
    // });

    // return [localFromConfig, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav32") {
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