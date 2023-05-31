let CommonFromPullData = require("../PullData/AsJson");
let CommonPullDataFromFile = require("../PullDataFromFile/AsJson");

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

        LocalFromCommonFromPullData = await CommonFromPullData.FromFoldFile({
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

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;

        LocalFromCommonFromPullData = CommonPullDataFromFile.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            return LocalReturnObject;
        };

        if (inItemName in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        } else {
            LocalReturnObject.KReason = `Item Name : ${inItemName} is not found!`;
        };
    };

    return LocalReturnObject;
};

// StartFunc({
//     inFolderName: "Masters",
//     inFileNameWithExtension: "Customers.json",
//     inItemName: "CustomerNames",
//     inDataPK: 16
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
    StartFunc,
    StartFuncNoSync
};