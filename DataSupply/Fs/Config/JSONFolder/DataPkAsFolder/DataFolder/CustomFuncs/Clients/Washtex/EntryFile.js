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

    let QrCodesBefore = LocalBeforePost({ inDataPk: localDatapk });

    async.forEachOf(LocalPurchasePK.ItemsInOrder, (InvGridvalue, InvGridkey) => {
        if ("Pcs" in InvGridvalue) {
            async.times(InvGridvalue.Pcs, (n) => {
                let LocalFromCommonDataFolderPushData = CommonDataFolderPushData.StartFuncNoAsync({
                    inFolderName: "QrCodes",
                    inFileNameOnly: "Generate",
                    inItemName: "Barcodes",
                    inDataPK: localDatapk,
                    inDataToInsert: {
                        ...InvGridvalue,
                        BookingData: {
                            CustomerData: LocalPurchasePK.CustomerData,
                            OrderData: LocalPurchasePK.OrderData,
                            AddOnData: LocalPurchasePK.AddOnData,
                            CheckOutData: LocalPurchasePK.CheckOutData
                        }
                    }
                });

                // LocalReturnObject.KResult.push(LocalFromCommonDataFolderPushData);
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
    return Object.keys(LocalQrCodeData.JsonData).length;
};

let LocalAfterPost = ({ inDataPk }) => {
    let localDatapk = inDataPk;
    let LocalQrCodeData = CommonFromQrCodes.StartFunc({ inDataPk: localDatapk });
    return Object.keys(LocalQrCodeData.JsonData).length;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'hello1') {
        let LocalMockData = require('./EntryFile.json');

        let Output = StartFunc({
            inDataPk: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('Output : ', Output);

    };
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'hell') {
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
