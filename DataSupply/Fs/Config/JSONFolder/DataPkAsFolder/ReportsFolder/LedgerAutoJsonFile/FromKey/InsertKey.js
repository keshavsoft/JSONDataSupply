let CommonMock = require("../../../../../../../MockAllow.json");
let CommonReports = require("../../../../../../../Fix/Json/Reports.json");
let CommonToLedgerJson = require("../PushDataFromFile/FromJson");
let CommonCheckKey = require("./CheckKey");

let StartFunc = async ({ DataPK, NewReportName, }) => {
    let localDataPk = DataPK;
    let localNewReportName = NewReportName;

    let localFromData = await CommonCheckKey.StartFunc({
        inDataPK: localDataPk,
        inReportKey: localNewReportName
    });

    let LocalReturnData = { ...localFromData };
    LocalReturnData.KTF = false;

    if (localFromData.KTF) {
        LocalReturnData.KReason = localFromData.KReason;
        return await LocalReturnData;
    };

    localFromData.JsonData[localNewReportName] = CommonReports;

    let jvarLocalPushData = await CommonToLedgerJson.StartFunc({
        inOriginalData: localFromData.JsonData,
        inDataToUpdate: LocalReturnData.JsonData,
        inDataPK: localDataPk
    });
    if (jvarLocalPushData.KTF) {
        LocalReturnData.KTF = true;

    };

    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'VV') {
        let LocalMockData = require('./insert.json');
        StartFunc({
            DataPK: CommonMock.DataPK,
            ToInsertKeyName: LocalMockData.ToName
        }).then(promiseData => {
            console.log("promiseData:", promiseData);

        })
    };
};

module.exports = {
    StartFunc
};