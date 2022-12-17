let CommonFromPullData = require("../PullData/FromFoldFileItemScreenName");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromPullData = await CommonFromPullData.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if ("TableColumns" in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

// StartFunc({
//     inFolderName: "Masters",
//     inFileNameWithExtension: "Customers.json",
//     inItemName: "CustomerNames",
//     inScreenName: "Create",
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
    StartFunc
};