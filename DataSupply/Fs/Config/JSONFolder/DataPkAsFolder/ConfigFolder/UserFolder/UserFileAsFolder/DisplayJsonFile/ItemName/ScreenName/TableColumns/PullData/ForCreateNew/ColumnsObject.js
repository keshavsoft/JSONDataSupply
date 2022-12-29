let CommonFromReturnColumns = require("./ReturnColumns");
let CommonFromDefaultValueCreate = require("../../ServerSide/PullData/DefaultValueCreate");
let _ = require("lodash");

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
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromReturnColumns = await CommonFromReturnColumns.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromReturnColumns.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromReturnColumns.KReason;
            return await LocalReturnObject;
        };

        let LocalColumnsArray = _.map(LocalFromCommonFromReturnColumns.JsonData, "DataAttribute");

        let LocalFromDefaultValueCreate = await CommonFromDefaultValueCreate.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        if (LocalFromDefaultValueCreate.KTF === false) {
            LocalReturnObject.KReason = LocalFromDefaultValueCreate.KReason;
            return await LocalReturnObject;
        };

        _.forEach(LocalColumnsArray, LoopItem => {
            LocalReturnObject.JsonData[LoopItem] = "";
        });

        LocalReturnObject.JsonData = { ...LocalReturnObject.JsonData, ...LocalFromDefaultValueCreate.JsonData };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalMockFuncForStartFunc = async () => {
    let LocalResult = await StartFunc({
        inFolderName: "Purchases",
        inFileNameWithExtension: "Vouchers.json",
        inItemName: "VouchersName",
        inScreenName: "Create",
        inDataPK: 901
    });

    console.log("LocalResult : ", LocalResult.JsonData);
};

//LocalMockFuncForStartFunc().then();

module.exports = {
    StartFunc
};