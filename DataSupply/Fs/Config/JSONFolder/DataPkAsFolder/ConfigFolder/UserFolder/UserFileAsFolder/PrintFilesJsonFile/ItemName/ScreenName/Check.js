let CommonFromPullData = require("../PullData/FromFoldFileItemName");

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
        //     console.log("LocalFromCommonFromPullData : ", LocalFromCommonFromPullData);
        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if (LocalinScreenName in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await StartFunc({
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

module.exports = {
    StartFunc
};