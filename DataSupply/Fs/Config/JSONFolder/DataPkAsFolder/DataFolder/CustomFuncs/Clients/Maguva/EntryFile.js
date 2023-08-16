let async = require("async");

let _ = require("lodash");
let CommonCheckFunc = require("./CheckFunc")

let CommonDataFolderPushData = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");

let CommonMock = require("../../../../../../../../MockAllow.json");
let StartFunc = ({ inPurchasePK, inDataPk }) => {

    let localDatapk = inDataPk;
    let LocalCheckFunc = CommonCheckFunc.StartFunc({ inPurchasePK, inDataPk });
    let LocalReturnObject = {
        ...LocalCheckFunc
    };

    Object.seal(LocalReturnObject);

    let LocalPurchasePK = LocalReturnObject.PurchasePk;
    let LocalSupplierName = LocalPurchasePK.SupplierName;
    let LocalBillNumber = LocalPurchasePK.BillNumber;
    let LocalAliasName = LocalPurchasePK.AliasName;

    async.forEachOf(LocalPurchasePK.InvGrid, (InvGridvalue, InvGridkey) => {
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

        //  LocalReturnObject.KResult.push(key);
    }, err => {
        if (err) console.error(err.message);
        // configs is now a map of JSON data
        doSomethingWith(configs);
    });
    LocalReturnObject.KTF = true;

    return LocalReturnObject;
};

// if (CommonMock.AllowMock) {
//     if (CommonMock.MockKey === 'Hai') {
//         let LocalMockData = require('./EntryFile.json');

//         StartFunc({
//             inDataPk: CommonMock.DataPK,
//             ...LocalMockData
//         }).then(PromiseData => {
//             console.log('PromiseData : ', PromiseData);

//         });
//     };
// };


if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'Hai') {
        let LocalMockData = require('./EntryFile.json');

        let Output = StartFunc({
            inDataPk: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('Output : ', Output);

    };
};

module.exports = { StartFunc };
