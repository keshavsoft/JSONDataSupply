let async = require("async");

let _ = require("lodash");
let CommonDataFolder = require("../../../DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");
let CommonPullDataFromItem = require("../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let CommonDataFolderPushData = require("../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");

let StartFunc = async ({ inPurchasePK,inDataPk }) => {
    console.log("inDataPk",inDataPk);

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
        inDataPk
    });

    let LocalQrCodeData = CommonPullDataFromItem.StartFunc({
        inFolderName: LocalToFolderName,
        inFileNameOnly: LocalToFileName,
        inItemName: LocalToItemName,
        inDataPk
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
    console.log("LocalPurchasePK : ", LocalPurchasePK);
    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;
    let LocalAliasName = LocalPurchasePK.AliasName;
    
    async.forEachOf(LocalPurchasePK.InvGrid, (InvGridvalue, InvGridkey) => {
        async.times(InvGridvalue.Qty, (n) => {
            let LocalFromCommonDataFolderPushData = CommonDataFolderPushData.StartFuncNoAsync({
                inFolderName: "QrCodes",
                inFileNameOnly: "Generate",
                inItemName: "Barcodes",
                inDataPk,
                inDataToInsert: {
                    CostPrice: InvGridvalue.UnitRate,
                    ProductName: InvGridvalue.ItemName,
                    ProductAliasName: "",
                    SalePrice: InvGridvalue.MRP,
                    PercentageValueAddition: InvGridvalue.PercentageValueAddition,
                    UserDescription: `${LocalAliasName}-${inPurchasePK}-${InvGridkey}-${InvGridvalue.Qty}`,
                    InventorySerial: InvGridkey,
                    PurchasePk: inPurchasePK,
                    SupplierName: LocalSupplierName,
                    BillNumber: LocalBillNumber,
                }
            });

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

    return await LocalReturnObject;
};

let LocalMockFunc = () => {
    //StartFunc({ inPurchasePK: "VouchersName.16.InvGrid.1" }).then();
    StartFunc({
        inGetKey: "VouchersName",
        inPurchasePK: "6"
    }).then(FromPromise => {
        console.log("FromPromise : ", FromPromise);
    });
};

// LocalMockFunc();

module.exports = { StartFunc };
