let path = require("path");
let CommonFromCheck = require("../Check");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromCheck;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalItemName = inItemName;
        let LocalScreenName = inScreenName;
        let LocalPrintFilesFolderName = "PrintFiles";

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.ScreenNamePath = LocalFromCommonFromCheck.ScreenNamePath;
        LocalReturnObject.PrintFilesPath = `${LocalReturnObject.ScreenNamePath}/${LocalPrintFilesFolderName}`;

        try {
            if (fs.statSync(LocalReturnObject.PrintFilesPath).isDirectory()) {
                LocalReturnObject.KTF = true;
            } else {
                LocalReturnObject.KReason = `PrintFilesPath not found!`;
            }
        } catch (error) {
            LocalReturnObject.KReason = error;
        };

    };

    return await LocalReturnObject;
};

// StartFunc({
//     inFolderName: "Transactions",
//     inFileNameWithExtension: "GST-SALES.json",
//     inItemName: "GST-SALE",
//     inScreenName: "Print",
//     inDataPK: 1022
// }).then(p => {
//     console.log("pppp : ", p);
// });

// FromJsonConfig({
//     inJsonConfig:{
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = {
    StartFunc
};