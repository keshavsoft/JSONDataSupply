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

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.ItemNamePath = LocalFromCommonFromCheck.ItemNamePath;
        LocalReturnObject.ScreenNamePath = `${LocalReturnObject.ItemNamePath}/${LocalScreenName}`;

        try {
            if (fs.statSync(LocalReturnObject.ScreenNamePath).isDirectory()) {
                LocalReturnObject.KTF = true;
            } else {
                LocalReturnObject.KReason = `ScreenNamePath : ${LocalScreenName} not found!`;
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