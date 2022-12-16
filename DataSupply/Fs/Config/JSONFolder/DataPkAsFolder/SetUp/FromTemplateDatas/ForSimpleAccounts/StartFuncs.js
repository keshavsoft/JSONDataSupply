let CommonFromAdminOnly = require("./AdminOnly");
let CommonFromConfigOnly = require("./ConfigOnly");
let CommonFromFirmDetailsJsonFile = require("./FirmDetailsJsonFile");
let CommonFromReportsOnly = require("./ReportsOnly");

let CommonCreateFolders = require("../../CreateFolders/Basic");

//let fs = require("fs-extra");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", KResult: [] };

    let LocalFromCommonFromCheck = await CommonCreateFolders.StartFunc({ inDataPK });
    LocalReturnData.ConfigPath = `${LocalFromCommonFromCheck.DataPKPath}/Config`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = `${inDataPK} : folder is already present...`;

        return await LocalReturnData;
    };

    let LocalFromCommonFromAdminOnly = await CommonFromAdminOnly.StartFunc({ inDataPK });
    let LocalFromCommonFromConfigOnly = await CommonFromConfigOnly.StartFunc({ inDataPK });
    let LocalFromCommonFromFirmDetailsJsonFile = await CommonFromFirmDetailsJsonFile.StartFunc({ inDataPK });
    let LocalFromCommonFromReportsOnly = await CommonFromReportsOnly.StartFunc({ inDataPK });

    //console.log("LocalFromCommonFromAdminOnly : ", LocalFromCommonFromReportsOnly);
    LocalReturnData.KResult.push(LocalFromCommonFromAdminOnly);
    LocalReturnData.KResult.push(LocalFromCommonFromConfigOnly);
    LocalReturnData.KResult.push(LocalFromCommonFromFirmDetailsJsonFile);
    LocalReturnData.KResult.push(LocalFromCommonFromReportsOnly);

    return await LocalReturnData;

    // let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    // if (LocalFromCommonFromConfigFolder) {

    // };
};

// StartFunc({ inDataPK: 1016 }).then(p => {
//     console.log("FromStartFunc : ", p);
// });

module.exports = { StartFunc };
