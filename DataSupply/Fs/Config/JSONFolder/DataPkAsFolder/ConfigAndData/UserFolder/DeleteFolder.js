let CommonConfigFolder = require("../../ConfigFolder/UserFolder/DeleteFolder/FromInput");
let CommonDataFolder = require("../../DataFolder/UserFolder/CreateFolder/FromInput");
let CommonMockAllow = require("../../../../../../MockAllow.json");

let StartFunc = async ({ inFolderName, inDataPK }) => {
    let localFromConfig = await CommonConfigFolder.StartFunc({
        inFolderName,
        inDataPK
    });

    // let localFromData = CommonDataFolder.StartFunc({
    //     inFolderName,
    //     inDataPK
    // });
    return await [localFromConfig];
    return [localFromConfig, localFromData];
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav34") {
        let LocalFrom = StartFunc({
            inFolderName: "Masters",
            inDataPK: 416
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };