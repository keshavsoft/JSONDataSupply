let async = require("async");

let _ = require("lodash");
let CommonCheckFunc = require("./CheckFunc")

let CommonDataFolderPushData = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");
let CommonFromQrCodes = require("./FromQrCodes");

let CommonMock = require("../../../../../../../../MockAllow.json");

let StartFunc = async ({ inPurchasePK, inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalCheckFunc = CommonCheckFunc.StartFunc({ inPurchasePK, inDataPk });
    let LocalReturnObject = {
        ...LocalCheckFunc
    };

    LocalReturnObject.KTF = false;

    if (LocalCheckFunc.KTF === false) {
        return LocalReturnObject;
    };

    // Object.seal(LocalReturnObject);

    let LocalPurchasePK = LocalReturnObject.PurchasePk;
    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;
    let LocalAliasName = LocalPurchasePK.AliasName;

    let QrCodesBefore = LocalBeforePost({ inDataPk: localDatapk });

    async.forEachOf(LocalPurchasePK.InvGrid, (InvGridvalue, InvGridkey) => {
        if ("Qty" in InvGridvalue) {
            let LoopInSideCeilingValue = Math.ceil(InvGridvalue.Qty);

            async.times(LoopInSideCeilingValue, (n) => {
                let LocalFromCommonDataFolderPushData = CommonDataFolderPushData.StartFuncNoAsync({
                    inFolderName: "QrCodes",
                    inFileNameOnly: "Generate",
                    inItemName: "Barcodes",
                    inDataPK: localDatapk,
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
        };
    }, err => {
        if (err) console.error(err.message);
    });

    let QrCodesAfter = LocalAfterPost({ inDataPk: localDatapk });

    LocalReturnObject.KTF = true;
    // LocalReturnObject.QrCodesRaised = parseInt(parseInt(QrCodesAfter) - parseInt(QrCodesBefore));

    LocalReturnObject.QrCodesRaised = QrCodesAfter - QrCodesBefore;
    delete LocalReturnObject.PurchasePk;
    delete LocalReturnObject.KResult;

    return await LocalReturnObject;
};


let LocalFuncForLoop_CanBeDeleted = async ({ inPurchasePK, inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalCheckFunc = CommonCheckFunc.StartFunc({ inPurchasePK, inDataPk });
    let LocalReturnObject = {
        ...LocalCheckFunc
    };

    LocalReturnObject.KTF = false;

    if (LocalCheckFunc.KTF === false) {
        return LocalReturnObject;
    };

    // Object.seal(LocalReturnObject);

    let LocalPurchasePK = LocalReturnObject.PurchasePk;
    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;
    let LocalAliasName = LocalPurchasePK.AliasName;

    let QrCodesBefore = LocalBeforePost({ inDataPk: localDatapk });

    async.forEachOf(LocalPurchasePK.InvGrid, (InvGridvalue, InvGridkey) => {
        if ("Qty" in InvGridvalue) {
            console.log("InvGridvalue.Qty : ", InvGridvalue.Qty);
            async.times(InvGridvalue.Qty, (n) => {
                let LocalFromCommonDataFolderPushData = CommonDataFolderPushData.StartFuncNoAsync({
                    inFolderName: "QrCodes",
                    inFileNameOnly: "Generate",
                    inItemName: "Barcodes",
                    inDataPK: localDatapk,
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
        };
    }, err => {
        if (err) console.error(err.message);
    });

    let QrCodesAfter = LocalAfterPost({ inDataPk: localDatapk });

    LocalReturnObject.KTF = true;
    // LocalReturnObject.QrCodesRaised = parseInt(parseInt(QrCodesAfter) - parseInt(QrCodesBefore));

    LocalReturnObject.QrCodesRaised = QrCodesAfter - QrCodesBefore;
    delete LocalReturnObject.PurchasePk;
    delete LocalReturnObject.KResult;

    return await LocalReturnObject;
};

let LocalBeforePost = ({ inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });
    return Object.keys(LocalQrCodeData.JsonDataFromItem).length;
};

let LocalAfterPost = ({ inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });
    return Object.keys(LocalQrCodeData.JsonDataFromItem).length;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'M08') {
        let LocalMockData = require('./EntryFile.json');

        StartFunc({
            inDataPk: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);
        });
    };
};

module.exports = { StartFunc };
