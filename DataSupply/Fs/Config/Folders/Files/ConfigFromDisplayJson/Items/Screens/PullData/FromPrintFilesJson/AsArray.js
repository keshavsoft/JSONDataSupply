let CommonPullData = require("../../../../../PullData/FromConfigFolder/FromPrintFilesJson/AsJson");

let ReturnArray = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inFolderName;
        let LocalItemName = inItemName;
        let LocalScreenName = inScreenName;

        LocalOriginalData = await CommonPullData.FromFoldFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension,
            inDataPK
        });
        
        if (LocalOriginalData.KTF === false) {
            LocalReturnObject.KReason = LocalOriginalData.KReason;
            return await LocalReturnObject;
        };

        if ((LocalItemName in LocalOriginalData.JsonData) === false) {
            LocalReturnObject.KReason = `Item Name : ${LocalItemName} not found in JsonData!`;
            return await LocalReturnObject;
        };

        if ((LocalScreenName in LocalOriginalData.JsonData[LocalItemName]) === false) {
            LocalReturnObject.KReason = `Screen Name : ${LocalScreenName} not found in Item Name : ${LocalItemName}`;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = LocalOriginalData.JsonData[LocalItemName][LocalScreenName];
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await ReturnArray({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inItemName: "GST-SALE",
        inScreenName: "Print",
        inDataPK: 1022
    });
};

MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    ReturnArray
};