let CommonFromPullData = require("../PullData/FromFoldFileItemName");
let CommonCheck = require("../Check");

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
            inDataPK: LocalDataPK
        });
        //console.log("cccccccccccc : ", LocalinScreenName, LocalFromCommonFromPullData);
        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if ((LocalinScreenName in LocalFromCommonFromPullData.JsonData) === false) {
            LocalReturnObject.KReason = `Screen Name : ${LocalinScreenName} not found!`;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromPullData = CommonCheck.StartFuncNoSync({
            inFolderName: LocalFolderName,
            inFileNameOnly,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            return LocalReturnObject;
        };

        if ((LocalinScreenName in LocalFromCommonFromPullData.JsonData[LocalinItemName]) === false) {
            LocalReturnObject.KReason = `Screen Name : ${LocalinScreenName} not found!`;
            return LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
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
    StartFunc,
    StartFuncNoSync
};