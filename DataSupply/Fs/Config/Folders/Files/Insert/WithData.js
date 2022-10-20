let CommonToDataFolder = require("./ToDataFolder");
let CommonToDisplayFolder = require("./ToDisplayFolder");
let CommonFolder = require("../../Check");

let InsertNew = async ({ inFolderName, inFileName, inData, inUserPK }) => {
    let LocalReturnData = { KTF: false };
    let LocalFromFolder = CommonFolder.ForExistence({ inFolderName, inUserPK });
    let LocalReturnFromData;
    let LocalRetrunFromConfig;

    if (LocalFromFolder.KTF) {
        LocalReturnFromData = await CommonToDataFolder.CreateDataFolderWithData({
            inFolderName,
            inFileNameWithExtension: inFileName,
            inData,
            inUserPK
        });

        if (LocalReturnFromData.KTF) {
            LocalRetrunFromConfig = await CommonToDisplayFolder.CreateConfigFolder({
                inFolderName,
                inFileNameWithExtension: inFileName, inUserPK
            });

            if (LocalRetrunFromConfig.KTF) {
                LocalReturnData.KTF = true;
            }
        };
    } else {
        LocalReturnData.KReason = `${inFolderName} - Folder not present`;
    };

    return await LocalReturnData;
};

module.exports = { InsertNew };
