let async = require("async");

let _ = require("lodash");
let CommonDataFolder = require("../../../DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");
let CommonPullDataFromItem = require("../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let CommonDataFolderPushData = require("../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");

let StartFunc = async ({ inPurchasePK }) => {
    let LocalReturnObject = {};
    LocalReturnObject.KTF = false;
    LocalReturnObject.KReason = "";
    LocalReturnObject.KResult = [];

    Object.seal(LocalReturnObject);

    let LocalGetKey = "VouchersName";
    let LocalToFolderName = "QrCodes";
    let LocalToFileName = "Generate";
    let LocalToItemName = "Barcodes";

    let LocalPurchasesData = CommonDataFolder.StartFunc({
        inFolderName: "Purchases",
        inFileNameOnly: "Vouchers",
        inDataPK: 901
    });

    let LocalQrCodeData = CommonPullDataFromItem.StartFunc({
        inFolderName: LocalToFolderName,
        inFileNameOnly: LocalToFileName,
        inItemName: LocalToItemName,
        inDataPK: 901
    });

    if (("KTF" in LocalQrCodeData) === false || LocalQrCodeData.KTF === false) {
        LocalReturnObject.KReason = "";
        return await LocalReturnObject;
    };

    if ((Object.values(LocalQrCodeData.JsonData).map(e => e.PurchasePk).find(e => e === inPurchasePK) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return await LocalReturnObject;
    };

    let LocalFromGetKey = _.get(LocalPurchasesData.JsonData, LocalGetKey);

    if ((inPurchasePK in LocalFromGetKey) === false) {
        LocalReturnObject.KReason = "PK not found in Purchases!";
        return await LocalReturnObject;
    };

    let LocalPurchasePK = LocalFromGetKey[inPurchasePK];

    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;

    async.forEachOf(LocalPurchasePK.InvGrid, (InvGridvalue, InvGridkey) => {
        async.times(InvGridvalue.Qty, (n) => {
            let LocalFromCommonDataFolderPushData = CommonDataFolderPushData.StartFuncNoAsync({
                inFolderName: "QrCodes",
                inFileNameOnly: "Generate",
                inItemName: "Barcodes",
                inDataPK: 901,
                inDataToInsert: {
                    CostPrice: InvGridvalue.UnitRate,
                    ProductName: InvGridvalue.ItemName,
                    ProductAliasName: "",
                    SalePrice: InvGridvalue.MRP,
                    PercentageValueAddition: InvGridvalue.PercentageValueAddition,
                    UserDescription: `RR-${InvGridkey}-${InvGridvalue.Qty}`,
                    InventorySerial: InvGridkey,
                    PurchasePk: inPurchasePK,
                    SupplierName: LocalSupplierName,
                    BillNumber: LocalBillNumber,
                }
            });
            console.log("LocalFromCommonDataFolderPushData : ", LocalFromCommonDataFolderPushData);
            LocalReturnObject.KResult.push(LocalFromCommonDataFolderPushData);
        }, err => {
            if (err) {
                console.log(err);
                // return console.log(err);
            };
        });

        //  LocalReturnObject.KResult.push(key);
    }, err => {
        if (err) console.error(err.message);
        // configs is now a map of JSON data
        doSomethingWith(configs);
    });


    //    console.log("ssssssssssssssss : ", LocalReturnObject);
    return await LocalReturnObject;
};

let StartFunc2 = async ({ inGetKey, inPurchasePK }) => {
    let LocalReturnObject = {};
    LocalReturnObject.KTF = false;
    LocalReturnObject.KReason = "";
    LocalReturnObject.KResult = [];

    Object.seal(LocalReturnObject);

    let LocalToFolderName = "QrCodes";
    let LocalToFileName = "Generate";
    let LocalToItemName = "Barcodes";

    let LocalPurchasesData = CommonDataFolder.StartFunc({
        inFolderName: "Purchases",
        inFileNameOnly: "Vouchers",
        inDataPK: 901
    });

    let LocalQrCodeData = CommonPullDataFromItem.StartFunc({
        inFolderName: LocalToFolderName,
        inFileNameOnly: LocalToFileName,
        inItemName: LocalToItemName,
        inDataPK: 901
    });

    if (("KTF" in LocalQrCodeData) === false || LocalQrCodeData.KTF === false) {
        LocalReturnObject.KReason = "";
        return await LocalReturnObject;
    };

    if ((Object.values(LocalQrCodeData.JsonData).map(e => e.PurchasePk).find(e => e === inPurchasePK) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return await LocalReturnObject;
    };

    let LocalGetKey = _.get(LocalPurchasesData.JsonData, inGetKey);

    if ((inPurchasePK in LocalGetKey) === false) {
        LocalReturnObject.KReason = "PK not found in Purchases!";
        return await LocalReturnObject;
    };

    let LocalPurchasePK = LocalGetKey[inPurchasePK];

    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;

    for await (const num of LocalPurchasePK.InvGrid) {
        console.log(num);
        // Expected output: 1

        break; // Closes iterator, triggers return
    }


    return await LocalReturnObject;
};


let StartFunc3 = async ({ inGetKey, inPurchasePK }) => {
    let LocalReturnObject = {};
    LocalReturnObject.KTF = false;
    LocalReturnObject.KReason = "";
    LocalReturnObject.KResult = [];

    Object.seal(LocalReturnObject);

    let LocalToFolderName = "QrCodes";
    let LocalToFileName = "Generate";
    let LocalToItemName = "Barcodes";

    let LocalPurchasesData = CommonDataFolder.StartFunc({
        inFolderName: "Purchases",
        inFileNameOnly: "Vouchers",
        inDataPK: 901
    });

    let LocalQrCodeData = CommonPullDataFromItem.StartFunc({
        inFolderName: LocalToFolderName,
        inFileNameOnly: LocalToFileName,
        inItemName: LocalToItemName,
        inDataPK: 901
    });

    if (("KTF" in LocalQrCodeData) === false || LocalQrCodeData.KTF === false) {
        LocalReturnObject.KReason = "";
        return await LocalReturnObject;
    };

    if ((Object.values(LocalQrCodeData.JsonData).map(e => e.PurchasePk).find(e => e === inPurchasePK) === undefined) === false) {
        LocalReturnObject.KReason = "QrCodes already raised!";
        return await LocalReturnObject;
    };

    let LocalGetKey = _.get(LocalPurchasesData.JsonData, inGetKey);

    if ((inPurchasePK in LocalGetKey) === false) {
        LocalReturnObject.KReason = "PK not found in Purchases!";
        return await LocalReturnObject;
    };

    let LocalPurchasePK = LocalGetKey[inPurchasePK];

    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;

    await Object.entries(LocalPurchasePK.InvGrid).forEach(
        async ([InvGridkey, InvGridvalue]) => {
            async.times(InvGridvalue.Qty, async (n) => {
                let LocalFromCommonDataFolderPushData = await CommonDataFolderPushData.StartFunc({
                    inFolderName: "QrCodes",
                    inFileNameOnly: "Generate",
                    inItemName: "Barcodes",
                    inDataPK: 901,
                    inDataToInsert: {
                        CostPrice: InvGridvalue.UnitRate,
                        ProductName: InvGridvalue.ItemName,
                        ProductAliasName: "",
                        SalePrice: InvGridvalue.MRP,
                        PercentageValueAddition: InvGridvalue.PercentageValueAddition,
                        UserDescription: `RR-${InvGridkey}-${InvGridvalue.Qty}`,
                        InventorySerial: InvGridkey,
                        PurchasePk: inPurchasePK,
                        SupplierName: LocalSupplierName,
                        BillNumber: LocalBillNumber,
                    }
                });
                console.log("LocalFromCommonDataFolderPushData : ", LocalFromCommonDataFolderPushData);
                await LocalReturnObject.KResult.push(LocalFromCommonDataFolderPushData);
            }, err => {
                if (err) {
                    console.log(err);
                    // return console.log(err);
                };
            });
        }
    );

    // await Object.entries(LocalPurchasePK.InvGrid).forEach(
    //     async ([InvGridkey, InvGridvalue]) => {

    //         for (let i = 0; i < InvGridvalue.Qty; i++) {
    //             let LocalFromCommonDataFolderPushData = await CommonDataFolderPushData.StartFunc({
    //                 inFolderName: "QrCodes",
    //                 inFileNameOnly: "Generate",
    //                 inItemName: "Barcodes",
    //                 inDataPK: 901,
    //                 inDataToInsert: {
    //                     CostPrice: InvGridvalue.UnitRate,
    //                     ProductName: InvGridvalue.ItemName,
    //                     ProductAliasName: "",
    //                     SalePrice: InvGridvalue.MRP,
    //                     PercentageValueAddition: InvGridvalue.PercentageValueAddition,
    //                     UserDescription: `RR-${InvGridkey}-${InvGridvalue.Qty}`,
    //                     InventorySerial: InvGridkey,
    //                     PurchasePk: inPurchasePK,
    //                     SupplierName: LocalSupplierName,
    //                     BillNumber: LocalBillNumber,
    //                 }
    //             });
    //             console.log("LocalFromCommonDataFolderPushData : ", LocalFromCommonDataFolderPushData);
    //             await LocalReturnObject.KResult.push(LocalFromCommonDataFolderPushData);
    //         };
    //     }
    // );
    console.log("ssssssssssssssss : ", LocalReturnObject);
    return await LocalReturnObject;
};

let StartFunc1 = async ({ inPurchasePK }) => {
    let LocalFromCommonDataFolder = CommonDataFolder.StartFunc({
        inFolderName: "Purchases",
        inFileNameOnly: "Vouchers",
        inDataPK: 901
    });

    let LocalTotalLoop = _.get(LocalFromCommonDataFolder.JsonData, inPurchasePK);

    for (let i = 0; i < LocalTotalLoop.Qty; i++) {

        let LocalFromCommonDataFolderPushData = await CommonDataFolderPushData.StartFunc({
            inFolderName: "QrCodes",
            inFileNameOnly: "Generate",
            inItemName: "Barcodes",
            inDataPK: 901,
            inDataToInsert: {
                CostPrice: LocalTotalLoop.UnitRate,
                ProductName: LocalTotalLoop.ItemName,
                ProductAliasName: "",
                SalePrice: null,
                PercentageValueAddition: LocalTotalLoop.PercentageValueAddition,
                UserDescription: `RR-1-${LocalTotalLoop.Qty}`,
                InventorySerial: "1",
                PurchasePk: "16",
                SupplierName: "Sup-2",
                BillNumber: "16",
            }
        });

        // "ProductName": "Pant",
        // "ProductAliasName": "",
        // "Barcode": "M-NaN",
        // "Price1": "",
        // "Price2": "",
        // "CostPrice": 1600,
        // "SalePrice": null,
        // "PercentageValueAddition": 30,
        // "UserDescription": "RR-1-2",
        // "InventorySerial": "1",
        // "PurchasePk": "16",
        // "SupplierName": "Sup-2",
        // "BillNumber": "16",

        console.log("LocalFromCommonDataFolderPushData : ", LocalFromCommonDataFolderPushData, LocalFromCommonDataFolder);
    };
    //Qty

    // console.log("-------- : ", _.get(LocalFromCommonDataFolder.JsonData, inPurchasePK));
};


let LocalMockFunc = () => {
    //StartFunc({ inPurchasePK: "VouchersName.16.InvGrid.1" }).then();
    StartFunc({
        inGetKey: "VouchersName",
        inPurchasePK: "21"
    }).then(FromPromise => {
        console.log("FromPromise : ", FromPromise);
    });
};

// LocalMockFunc();

module.exports = { StartFunc };
