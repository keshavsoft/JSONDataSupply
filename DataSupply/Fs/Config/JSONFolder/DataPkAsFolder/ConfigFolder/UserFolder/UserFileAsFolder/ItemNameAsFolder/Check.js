let path = require("path");
let CommonFromCheck = require("../Check");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalItemName = inItemName;

        LocalFromCommonFromCheck = await CommonFromCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonFilePath = LocalFromCommonFromCheck.JsonFilePath;
        LocalReturnObject.ItemNamePath = `${LocalReturnObject.JsonFilePath}/${LocalItemName}`;

        try {
            if (fs.statSync(LocalReturnObject.ItemNamePath).isDirectory()) {
                LocalReturnObject.KTF = true;
            } else {
                LocalReturnObject.KReason = `ItemNamePath : ${LocalItemName} not found!`;
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