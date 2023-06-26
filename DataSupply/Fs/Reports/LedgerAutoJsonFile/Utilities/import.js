let CommonFromLedgerJson = require("../../../Config/JSONFolder/DataPkAsFolder/ReportsFolder/LedgerAutoJsonFile/PullDataFromFile/FromJson");
let CommonToLedgerJson = require("../../../Config/JSONFolder/DataPkAsFolder/ReportsFolder/LedgerAutoJsonFile/PushDataFromFile/FromJson");
let CommonMock = require("../../../../MockAllow.json");

let StartFunc = async ({ DataPK, ToName, ReportConfigObject }) => {

    let localDataPk = DataPK;
    let localToName = ToName;
    let localReportConficObject = ReportConfigObject;
    let LocalReturnData = { KTF: false };

    let localFromData = await CommonFromLedgerJson.StartFunc({ inDataPK: localDataPk });

    if (localFromData.KTF === false) {
        LocalReturnData.KReason = localFromData.KReason;
        return await LocalReturnData;
    };

    let localData = localFromData.JsonData

    if (localToName in localData) {
        LocalReturnData.KReason = "Already Report Name is there..!";
        return await LocalReturnData;
    };

    if ((localToName in localData) === false) {

        let localReportsObject = JSON.parse(JSON.stringify(localReportConficObject));
        localData[localToName] = localReportsObject;

        let jvarLocalPushData = await CommonToLedgerJson.StartFunc({
            inOriginalData: localFromData.JsonData,
            inDataToUpdate: localData,
            inDataPK: localDataPk
        });
        if (jvarLocalPushData.KTF) {
            LocalReturnData.KTF = true;

        };
        return await LocalReturnData;
    };

    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSV1') {
        let LocalMockData = require('./import.json');
         StartFunc({
            DataPK: CommonMock.DataPK,
            ToName: LocalMockData.ToName,
            ReportConfigObject: LocalMockData.ReportConfigObject
        }).then(promiseData=>{
            console.log("promiseData:", promiseData);

        })
    };
};

module.exports = {
    StartFunc
};