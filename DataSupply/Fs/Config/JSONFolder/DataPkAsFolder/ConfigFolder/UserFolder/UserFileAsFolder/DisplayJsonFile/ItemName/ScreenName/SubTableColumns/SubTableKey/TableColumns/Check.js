let CommonFromPullData = require("../PullData/AsObject");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inSubTableColumnKey, inDataPK }) => {
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
            inSubTableColumnKey,
            inDataPK: LocalDataPK
        });
        //  console.log("aaaaaaaaaaa------ : ", LocalFromCommonFromPullData);

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData
       // console.log("LocalFromCommonFromPullData------ : ", LocalFromCommonFromPullData);

        if ("TableColumns" in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

let LocalMockFuncForStartFunc = async () => {
    let LocalResult = await StartFunc({
        inFolderName: "Purchases",
        inFileNameWithExtension: "Vouchers.json",
        inItemName: "VouchersName",
        inScreenName: "Create",
        inSubTableColumnKey: "InvGrid",
        inDataPK: 901
    });

    console.log("LocalResult : ", LocalResult.JsonData);
};

//LocalMockFuncForStartFunc().then();

module.exports = {
    StartFunc
};