const e = require("express");
let CommonFromPullData = require("../PullDataFromFile/FromFoldFile");

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

        LocalFromCommonFromPullData = await CommonFromPullData.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };
        //   console.log("LocalFromCommonFromPullData22222222 : ", LocalFromCommonFromPullData.JsonData);
        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if (inItemName in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        } else {
            LocalReturnObject.KReason = `Item Name : ${inItemName} is not found!`;
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await StartFunc({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inItemName: "GST-SALE",
        inDataPK: 1022
    });
};

// MockFuncFromFolderFile().then(p => {
//     console.log("aaaaaaaa : ", p);
// });

module.exports = {
    StartFunc
};