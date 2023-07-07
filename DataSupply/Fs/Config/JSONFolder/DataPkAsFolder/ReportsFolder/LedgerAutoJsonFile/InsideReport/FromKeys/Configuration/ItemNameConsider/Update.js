let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../../PushDataFromFile/FromJson");

let CommonMock = require("../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, VoucherPk, ReportName, FolderName, FileName, ItemName, ItemNameConsider }) => {
    
    let LocalinDataPK = DataPK;
    let LocalReportName = ReportName;
    let LocalVouchersConsiderPk = parseInt(VoucherPk);

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

            LocalFindColumnObject.FolderName = FolderName;
            LocalFindColumnObject.FileName = FileName;
            LocalFindColumnObject.ItemName = ItemName;
            LocalFindColumnObject.ItemNameConsider = ItemNameConsider;

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
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'MVM') {
        let LocalMockData = require('./Update.json');

        Update({
            DataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    Update
};