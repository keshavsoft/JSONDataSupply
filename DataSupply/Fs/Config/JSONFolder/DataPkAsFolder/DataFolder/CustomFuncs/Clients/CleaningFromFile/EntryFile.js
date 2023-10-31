let async = require("async");

let _ = require("lodash");
let CommonCheckFunc = require("./CheckFunc")

let CommonDataFolderPushData = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");
let CommonFromQrCodes = require("./FromQrCodes");

let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonCleaning = require("../../../UserFolder/UserJsonFile/ItemName/PushData/GeneratePkWithTimeStamp/EntryFile")

let StartFunc = async ({ inPurchasePK, inFileNameOnly, inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalinPurchasePk = inPurchasePK;
    let LocalFileNameOnly = inFileNameOnly;

    let LocalCheckFunc = CommonCheckFunc.StartFunc({
        inPurchasePK: LocalinPurchasePk,
        inFileNameOnly: LocalFileNameOnly,
        inDataPk: localDatapk
    });

    let LocalReturnObject = { ...LocalCheckFunc };

    LocalReturnObject.KTF = false;

    if (LocalCheckFunc.KTF === false) return LocalReturnObject;

    let LocalPurchasePK = LocalReturnObject.PurchasePk;

    let QrCodesBefore = LocalBeforePost({ inDataPk: localDatapk });

    async.forEachOf(LocalPurchasePK.ItemsInOrder, (InvGridvalue, InvGridkey) => {
        if ("Pcs" in InvGridvalue) {
            async.times(InvGridvalue.Pcs, (n) => {
                let LoopInsideAddOn = [];

                Object.entries(LocalPurchasePK.AddOnData).forEach(
                    ([key, value]) => {
                        LoopInsideAddOn.push({
                            ...value,
                            pk: key
                        })
                    }
                );

                // CommonDataFolderPushData.StartFuncNoAsync({
                //     inFolderName: "QrCodes",
                //     inFileNameOnly: "Generate",
                //     inItemName: "Barcodes",
                //     inDataPK: localDatapk,
                //     inDataToInsert: {
                //         GenerateReference: {
                //             ReferncePk: LocalinPurchasePk,
                //             FileNameOnly: LocalFileNameOnly
                //         },
                //         ...InvGridvalue,
                //         BookingData: {
                //             CustomerData: LocalPurchasePK.CustomerData,
                //             OrderData: LocalPurchasePK.OrderData,
                //             AddOnData: LoopInsideAddOn.filter(element => {
                //                 return element.AddOnItemSerial === InvGridvalue.ItemSerial;
                //             }),
                //             CheckOutData: LocalPurchasePK.CheckOutData
                //         }
                //     }
                // });
                 CommonCleaning.StartFunc({
                    inFolderName: "QrCodes",
                    inFileNameOnly: "Generate",
                    inItemName: "Barcodes",
                    inDataPK: localDatapk,
                    inDataToInsert: {
                        GenerateReference: {
                            ReferncePk: LocalinPurchasePk,
                            FileNameOnly: LocalFileNameOnly
                        },
                        ...InvGridvalue,
                        BookingData: {
                            CustomerData: LocalPurchasePK.CustomerData,
                            OrderData: LocalPurchasePK.OrderData,
                            AddOnData: LoopInsideAddOn.filter(element => {
                                return element.AddOnItemSerial === InvGridvalue.ItemSerial;
                            }),
                            CheckOutData: LocalPurchasePK.CheckOutData
                        }
                    }
                });
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

    LocalReturnObject.QrCodesRaised = QrCodesAfter - QrCodesBefore;
    delete LocalReturnObject.PurchasePk;
    delete LocalReturnObject.KResult;

    return await LocalReturnObject;
};

let LocalBeforePost = ({ inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });
    return Object.keys(LocalQrCodeData.JsonData).length;
};

let LocalAfterPost = ({ inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });
    return Object.keys(LocalQrCodeData.JsonData).length;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K12') {
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
