let CommonFromReturnColumns = require("./ReturnColumns");
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
        console.log("total columns : ", LocalFromCommonFromAsArray.JsonData.length);
        // let LocalShowInTableColumns = _.filter(LocalFromCommonFromAsArray.JsonData, { CreateNew: true });

        // LocalReturnObject.JsonData = LocalShowInTableColumns;

        //   console.log("sssssss : ", LocalReturnObject.JsonData.length, LocalShowInTableColumns.length);

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

   // console.log("LocalResult : ", LocalResult.JsonData.length);
};

// LocalMockFuncForStartFunc().then();

// ColumnsAsObject({
//     inFolderName: "Transactions",
//     inFileNameWithExtension: "GST-SALES.json",
//     inItemName: "GST-SALE",
//     inScreenName: "Create",
//     inDataPK: 1022
// }).then(p => {
//         console.log("pppp : ", p);
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