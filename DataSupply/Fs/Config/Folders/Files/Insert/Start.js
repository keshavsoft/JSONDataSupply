let CommonToDataFolder = require("./ToDataFolder");
let CommonToDisplayFolder = require("./ToDisplayFolder");
let CommonToReturnDataJson = require("./ToReturnDataJson");

let InsertNew = async ({ inFolderName, inFileName, inUserPK }) => {
    let LocalReturnData = {
        KTF: false, FormDataFolder: {}, FromConfigFolder: {},
        FromReturnDataJson: {}
    };

    let LocalRetrunFromConfig;
    let LocalFromToReturnDataJson;

    let LocalReturnFromData = await CommonToDataFolder.CreateDataFolder({
        inFolderName,
        inFileNameWithExtension: inFileName, inUserPK
    });

    LocalReturnData.FormDataFolder = LocalReturnFromData;

    if (LocalReturnFromData.KTF) {
        LocalRetrunFromConfig = await CommonToDisplayFolder.CreateConfigFolder({
            inFolderName,
            inFileNameWithExtension: inFileName, inUserPK
        });

        LocalReturnData.FromConfigFolder = LocalRetrunFromConfig;

        if (LocalRetrunFromConfig.KTF) {
            LocalReturnData.KTF = true;

            LocalFromToReturnDataJson = await CommonToReturnDataJson.StartFunc({
                inFolderName,
                inFileNameWithExtension: inFileName,
                inContent: {},
                inUserPK
            });

            LocalReturnData.FromReturnDataJson = LocalFromToReturnDataJson;

            if (LocalRetrunFromConfig.KTF) {
                LocalReturnData.KTF = true;
            };
        };
    };

    return await LocalReturnData;
};

let MockFuncFoldFileItem = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    return await InsertNew({
        inFolderName,
        inFileName: inFileNameWithExtension,
        inUserPK: inDataPK
    });
};

// MockFuncFoldFileItem({
//     inFolderName: "Masters", inFileNameWithExtension: "f1.json",
//     inDataPK: 1018
// }).then(p => {
//     console.log("P : ", p.KTF);
// });

module.exports = { InsertNew };
