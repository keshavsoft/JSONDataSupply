let CommonFromCheck = require("../Check");
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

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        let LocalShowInTableColumns = _.filter(LocalFromCommonFromCheck.JsonData.TableColumns, { ShowInTable: true });

        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData.TableColumns

        //   console.log("sssssss : ", LocalReturnObject.JsonData.length, LocalShowInTableColumns.length);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let AsArray = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
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

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        let LocalShowInTableColumns = _.filter(LocalFromCommonFromCheck.JsonData.TableColumns, { ShowInTable: true });

        LocalReturnObject.JsonData = _.map(LocalShowInTableColumns, p => p.DataAttribute);

        console.log("sssssss : ", LocalReturnObject.JsonData);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let ColumnsAsObject = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
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

        LocalFromCommonFromCheck = await CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return await LocalReturnObject;
        };

        let LocalShowInTableColumns = _.filter(LocalFromCommonFromCheck.JsonData.TableColumns, { ShowInTable: true });

        let LocalColumnsAsArray = _.map(LocalShowInTableColumns, p => p.DataAttribute);

        LocalReturnObject.JsonData = LocalColumnsAsArray.reduce((a, b) => (a[b] = '', a), {});

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

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
    StartFunc,
    ColumnsAsObject
};