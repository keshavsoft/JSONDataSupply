let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../PushDataFromFile/FromJson");

let Update = async ({ DataPK, ItemName, voucher, BodyAsJson }) => {
    const LocalDataToUpdate = (({ FromFolder,ItemNameConsider }) => ({ FromFolder,ItemNameConsider }))(BodyAsJson);
    let LocalinDataPK = DataPK;
    let LocalReportName = ItemName;
    let LocalVouchersConsiderPk = parseInt(voucher);

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

    if (LocalReportName in LocalNewData) {
        if ("VouchersConsider" in LocalNewData[LocalReportName]) {
            let LocalFilterObject = {};
            LocalFilterObject.pk = LocalVouchersConsiderPk;
            LocalFindColumnObject = _.find(LocalNewData[LocalReportName].VouchersConsider, LocalFilterObject);

            LocalFindColumnObject.FromFolder = LocalDataToUpdate.FromFolder;
            LocalFindColumnObject.ItemNameConsider = LocalDataToUpdate.ItemNameConsider;

            LocalFromUpdate = await CommonFromPushData.StartFunc({
                inDataPK: LocalinDataPK,
                inDataToUpdate: LocalNewData,
                inOriginalData: LocalFromPullData.JsonData
            });

            if (LocalFromUpdate.KTF) {
                LocalReturnObject.KTF = true;
            };

            return await LocalReturnObject;

        };
    };


    return await LocalReturnObject;
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
    Update
};