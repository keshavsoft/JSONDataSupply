let CommonFromPullData = require("../../PullData/AsArray");
let CommonFromDataFolder = require("../../../../../../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let path = require("path");

let _ = require("lodash");

let StartFunc2 = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    console.log("kkkkkkkkkkkkkkk");
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
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };
        let LocalFromServerSide = await LocalServerSideStart({
            inTableColumnsArray: LocalFromCommonFromPullData.JsonData,
            inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK
        });
        console.log("LocalFromServerSide : ", LocalFromServerSide);
        //LocalReturnObject.JsonData = LocalFromBarcode.JsonData;

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalServerSideStart = async ({ inTableColumnsArray, inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalShowInTableColumns = _.filter(inTableColumnsArray, ["ServerSide.DefaultValueCreate.ControlType", "Barcode"]);

        let LocalFromBarcode = LocalForBarcode({
            inTableColumns: LocalShowInTableColumns,
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        if (LocalFromBarcode.KTF === false) {
            LocalReturnObject.KReason = "Error from barcode generation";
            return await LocalReturnObject;
        };

        let LocalDateTableColumns = _.filter(inTableColumnsArray, ["ServerSide.DefaultValueCreate.ControlType", "Date"]);

        let LocalFromDate = LocalForBarcode({
            inTableColumns: LocalDateTableColumns,
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        if (LocalFromDate.KTF === false) {
            LocalReturnObject.KReason = "Error from date generation";
            return await LocalReturnObject;
        };
        console.log("LocalFromDate : ", LocalFromDate);
        LocalReturnObject.JsonData = LocalFromBarcode.JsonData;

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

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
        //  console.log("LocalReturnObject : ", LocalReturnObject);
        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };

        let LocalBarcodeTableColumns = _.filter(LocalFromCommonFromPullData.JsonData, ["ServerSide.DefaultValueCreate.ControlType", "Barcode"]);

        let LocalFromBarcode = LocalForBarcode({
            inTableColumns: LocalBarcodeTableColumns,
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        if (LocalFromBarcode.KTF === false) {
            LocalReturnObject.KReason = "Error from barcode generation";
            return await LocalReturnObject;
        };

        let LocalDateTableColumns = _.filter(LocalFromCommonFromPullData.JsonData, ["ServerSide.DefaultValueCreate.ControlType", "Date"]);

        let LocalFromDate = LocalForPresentDate({
            inTableColumns: LocalDateTableColumns,
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        if (LocalFromDate.KTF === false) {
            LocalReturnObject.KReason = "Error from date";
            return await LocalReturnObject;
        };

        let LocalNumber = _.filter(LocalFromCommonFromPullData.JsonData, ["ServerSide.DefaultValueCreate.ControlType", "Number"]);

        let LocalResultFromNumberMax = LocalForNumberMax({
            inTableColumns: LocalNumber,
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        if (LocalResultFromNumberMax.KTF === false) {
            LocalReturnObject.KReason = "Error from date";
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = { ...LocalFromBarcode.JsonData, ...LocalFromDate.JsonData, ...LocalResultFromNumberMax.JsonData };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalForBarcode = ({ inTableColumns, inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalinItemName = inItemName;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    let LocalFromData = CommonFromDataFolder.ReturnAsArrayWithPK({
        inFolderName: LocalFolderName,
        inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
        inItemName: LocalinItemName,
        inDataPK: LocalDataPK
    });

    if (LocalFromData.KTF === false) {
        LocalReturnObject.KReason = LocalFromData.KReason;
        return LocalReturnObject;
    };

    let LocalJsonData = LocalFromData.JsonData;

    //console.log("LocalJsonData : ", LocalJsonData);
    //    console.log("LocalData : ", LocalJsonData);
    let LocalTableColumnsFiltered = _.filter(inTableColumns, ["ServerSide.DefaultValueCreate.Type", "MAGUVAA"]);
    let LocalTableColumnsArray = _.map(LocalTableColumnsFiltered, "DataAttribute");

    LocalTableColumnsArray.forEach(element => {
        LocalReturnObject.JsonData[element] = `M-${_.max(_.map(_.map(LocalJsonData, element), LoopElement => parseInt(LoopElement.substring(2)))) + 1}`;
    });

    LocalReturnObject.KTF = true;

    return LocalReturnObject;
};

let LocalForPresentDate = ({ inTableColumns }) => {
    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    let LocalTableColumnsFiltered = _.filter(inTableColumns, ["ServerSide.DefaultValueCreate.Type", "PresentDate"]);
    let LocalTableColumnsArray = _.map(LocalTableColumnsFiltered, "DataAttribute");

    LocalTableColumnsArray.forEach(element => {
        LocalReturnObject.JsonData[element] = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    });

    // switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
    //     case "PresentDate":
    //         LocalControlTypeFuncs.Date.PresentDate({ inLoopData });

    //         break;
    //     case "LastVoucher":
    //         LocalControlTypeFuncs.Date.LastVoucher({ inData, inLoopData });
    //         break;
    //     default:
    //         break;
    // };

    LocalReturnObject.KTF = true;

    return LocalReturnObject;
};

let LocalForNumberMax = ({ inTableColumns, inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalinItemName = inItemName;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    let LocalFromData = CommonFromDataFolder.ReturnAsArrayWithPK({
        inFolderName: LocalFolderName,
        inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
        inItemName: LocalinItemName,
        inDataPK: LocalDataPK
    });

    if (LocalFromData.KTF === false) {
        LocalReturnObject.KReason = LocalFromData.KReason;
        return LocalReturnObject;
    };

    let LocalJsonData = LocalFromData.JsonData;

    let LocalTableColumnsFiltered = _.filter(inTableColumns, ["ServerSide.DefaultValueCreate.Type", "Max"]);
    // console.log("LocalJsonData : ", LocalJsonData, LocalTableColumnsFiltered.length);
    if (LocalJsonData.length === 0) {
        LocalTableColumnsFiltered.forEach(element => {
            LocalReturnObject.JsonData[element.DataAttribute] = element.ServerSide.DefaultValueCreate.StartValue;
        });
    } else {
        LocalTableColumnsFiltered.forEach(element => {
            LocalReturnObject.JsonData[element.DataAttribute] = _.max(_.map(_.map(LocalJsonData, element.DataAttribute), LoopItem => parseInt(LoopItem))) + 1;
        });
    };

    LocalReturnObject.KTF = true;

    return LocalReturnObject;
};

let LocalMockFuncForStartFunc = async () => {
    let LocalResult = await StartFunc({
        inFolderName: "Purchases",
        inFileNameWithExtension: "Vouchers.json",
        inItemName: "VouchersName",
        inScreenName: "Create",
        inDataPK: 901
    });

    console.log("LocalResult ----------: ", LocalResult.JsonData);
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