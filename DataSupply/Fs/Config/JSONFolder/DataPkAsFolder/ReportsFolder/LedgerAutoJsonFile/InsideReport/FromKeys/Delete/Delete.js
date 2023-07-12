let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../PushDataFromFile/FromJson");

let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = async ({ DataPK, ReportName, VoucherPk }) => {

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

            const filteredPeople = LocalNewData[LocalReportName].VouchersConsider.filter((item) => item.pk !== LocalVouchersConsiderPk);
            LocalNewData[LocalReportName].VouchersConsider = filteredPeople

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
    if (CommonMock.MockKey === 'SIN') {
        let LocalMockData = require('./Delete.json');

        StartFunc({
            DataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    StartFunc
};