let CommonFromAdminOnly = require("./AdminOnly");
let CommonFromConfigOnly = require("./ConfigOnly");
let CommonFromFirmDetailsJsonFile = require("./FirmDetailsJsonFile");

let CommonCreateFolders = require("../../CreateFolders/Basic");

//let fs = require("fs-extra");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = await CommonCreateFolders.StartFunc({ inDataPK });
    LocalReturnData.ConfigPath = `${LocalFromCommonFromCheck.DataPKPath}/Config`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = `${inDataPK} : folder is already present...`;

        return await LocalReturnData;
    };

    let LocalFromCommonFromAdminOnly = await CommonFromAdminOnly.StartFunc({ inDataPK });
    let LocalFromCommonFromConfigOnly = await CommonFromConfigOnly.StartFunc({ inDataPK });
    let LocalFromCommonFromFirmDetailsJsonFile = await CommonFromFirmDetailsJsonFile.StartFunc({ inDataPK });

    console.log("LocalFromCommonFromAdminOnly : ", LocalFromCommonFromFirmDetailsJsonFile, LocalFromCommonFromAdminOnly, LocalFromCommonFromConfigOnly);

    return await LocalReturnData;

    // let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    // if (LocalFromCommonFromConfigFolder) {

    // };
};

// StartFunc({ inDataPK: 1016 }).then(p => {

//     console.log("FromStartFunc : ", p);

// });

module.exports = { StartFunc };
