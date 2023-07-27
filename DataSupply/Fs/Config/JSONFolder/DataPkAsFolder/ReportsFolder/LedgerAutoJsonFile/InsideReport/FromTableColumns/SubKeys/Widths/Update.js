let _ = require("lodash");
let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../../PushDataFromFile/FromJson");
let CommonMock = require("../../../../../../../../../../MockAllow.json");


let StartFunc = async ({ inDataPK, ReportName, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ px }) => ({ px }))(BodyAsJson);
    let LocalinDataPK = inDataPK;
    let localReportName = ReportName;
    let localDataAttribute = DataAttribute;
    let LocalFromUpdate;

    let LocalLedgerJsonDate = await CommonFromFromJson.StartFunc({ inDataPK: LocalinDataPK });
    let LocalReturnData = { ...LocalLedgerJsonDate };
    LocalReturnData.KTF = false;

    if (LocalLedgerJsonDate.KTF === false) {
        return await LocalReturnData;
    };

    if (localReportName in LocalReturnData.JsonData === false) {
        LocalReturnData.KReason = `ReportName : ${ReportName} is Not Found..!`;
        return await LocalReturnData;
    };

    if ("TableColumns" in LocalReturnData.JsonData[localReportName] === false) {
        LocalReturnData.KReason = `TableColumns : is Not Found..!`;
        return await LocalReturnData;
    };

    let localFindColumn = {};
    localFindColumn.DataAttribute = localDataAttribute
    let LocalColumnObject = _.find(LocalReturnData.JsonData[localReportName].TableColumns, localFindColumn);
    LocalColumnObject.Widths.px = LocalDataToUpdate.px;

    LocalFromUpdate = await CommonFromPushData.StartFunc({
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalReturnData.JsonData,
        inOriginalData: LocalLedgerJsonDate.JsonData
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '8889') {
        let LocalMockData = require('./Update.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = { StartFunc };