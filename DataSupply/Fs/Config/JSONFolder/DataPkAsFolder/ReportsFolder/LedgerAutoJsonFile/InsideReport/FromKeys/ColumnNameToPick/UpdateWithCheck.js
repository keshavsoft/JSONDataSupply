let CommonPullDataFromConfig = require("../../../../../../../../Config/Folders/Files/Items/Check");
let CommonFromPushData = require("./Update");


let StartFunc = async ({ DataPK, ItemName, voucher, BodyAsJson }) => {

    let LocalinDataPK = DataPK;
    let LocalReportName = ItemName;
    let LocalVouchersConsiderPk = parseInt(voucher);
    let localFolderName = BodyAsJson.FolderName;
    let localFileName = BodyAsJson.FileName;
    let localItemName = BodyAsJson.ItemName;
    let localGridName = BodyAsJson.ColumnNameToPick;

    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.StartFunc({
        inDataPK: LocalinDataPK
    });

    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason;
        return LocalReturnObject;
    };
    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));


    LocalFromUpdate = await CommonFromPushData.Update({
        DataPK: LocalinDataPK,
        ItemName: LocalReportName, voucher: LocalVouchersConsiderPk, BodyAsJson
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;

};
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '') {
        let LocalMockData = require('./UpdateWithCheck.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

let MockFunc = () => {
    Update({
        DataPK: 1024,
        ItemName: "StockBalances",
        voucher: "20"
    }).then((PromiseData) => {
        console.log("PromiseData--", Object.keys(PromiseData));
    })
};
// MockFunc();

module.exports = {
    StartFunc
};