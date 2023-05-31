let CommonCheck = require("../Check");

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inDataAttribute }) => {
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
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            return LocalReturnObject;
        };

        let LocalFind = LocalFromCommonFromPullData.JsonData[LocalinItemName][LocalinScreenName].TableColumns.find(element => {
            element.DataAttribute === inDataAttribute;
        });

        LocalReturnObject.KReason = "DataAttribute found!";

        if (LocalFind === undefined) {
            LocalReturnObject.KTF = true;
        };
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
    StartFuncNoSync
};