let CommonMock = require("../../../../../../../MockAllow.json");
let CommonReports = require("../../../../../../../Fix/Json/Reports.json");
let CommonToLedgerJson = require("../PushDataFromFile/FromJson");
let CommonCheckKey = require("./CheckKey");

let StartFunc = async ({ DataPK, ToInsertKeyName, }) => {
    let localDataPk = DataPK;
    let localToInsertKeyName = ToInsertKeyName;

    let localFromData = await CommonCheckKey.StartFunc({
        inDataPK: localDataPk,
        inReportKey: localToInsertKeyName
    });

    let LocalReturnData = { ...localFromData };
    LocalReturnData.KTF = false;

    if (localFromData.KTF) {
        LocalReturnData.KReason = localFromData.KReason;
        return await LocalReturnData;
    };

    localFromData.JsonData[ToInsertKeyName] = CommonReports;

    let jvarLocalPushData = await CommonToLedgerJson.StartFunc({
        inOriginalData: localFromData.JsonData,
        inDataToUpdate: localFromData.JsonData,
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