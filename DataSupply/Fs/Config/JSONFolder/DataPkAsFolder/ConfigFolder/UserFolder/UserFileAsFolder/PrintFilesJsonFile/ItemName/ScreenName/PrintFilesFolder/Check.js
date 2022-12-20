let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalinItemName = inItemName;
    let LocalinScreenName = inScreenName;
    let LocalFileName = "PrintFiles.json";

    let LocalDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
        inFolderName: LocalFolderName,
        inFileNameWithExtension: LocalFileNameWithExtension,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };
    //  console.log("LocalFromCommonFromCheck : ", LocalFromCommonFromCheck);

    LocalReturnData.JsonFilePath = LocalFromCommonFromCheck.JsonFilePath;
    LocalReturnData.PrintFilesPath = `${LocalFromCommonFromCheck.JsonFilePath}/${LocalFileName}`;

    try {
        if (fs.statSync(LocalReturnData.PrintFilesPath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let MockFuncFromFolderFile = async () => {
    return await ForExistence({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inItemName: "GST-SALE",
        inScreenName: "Print",
        inDataPK: 1022
    });
};

// MockFuncFromFolderFile().then(p => {
//     console.log("aaaaaaaa : ", p);
// });

module.exports = { ForExistence };
