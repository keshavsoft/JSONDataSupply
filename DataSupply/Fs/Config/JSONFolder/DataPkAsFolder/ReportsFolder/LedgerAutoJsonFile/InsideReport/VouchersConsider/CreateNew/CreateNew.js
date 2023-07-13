let CheckCheckReportKey = require("../../CheckReportKey");
let CommonFromToJson = require("../../../PushDataFromFile/FromJson");
let VouchersConsiderJsonData = require("../../../../../../../../../Fix/Json/Reports/VouchersConsider.json");
let CommonFromMaxPk = require("../MaxPk");

let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = async ({ inDataPK, ReportName, FolderName, FileName, ItemName }) => {
    let jvarLocalDataPK = inDataPK;
    let jvarLocalReportName = ReportName;

    let ComonFromJsonData = CheckCheckReportKey.StartFunc({ inDataPK: jvarLocalDataPK, ReportName: jvarLocalReportName });

    let LocalReturnData = { ...ComonFromJsonData };
    LocalReturnData.KTF = false;

    if (ComonFromJsonData.KTF === false) {
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(LocalReturnData.JsonData));

    let LocalFromMax = await CommonFromMaxPk.StartFunc({
        inDataPK: jvarLocalDataPK,
        ReportName: jvarLocalReportName
    });

    if (LocalFromMax.KTF === false) {
        LocalReturnData.KReason = LocalFromMax.KReason;
        return await LocalReturnData;
    };
    LocalReturnData.MaxPk = LocalFromMax.MaxPk + 1

    let localVouchersConsiderJsonData = VouchersConsiderJsonData;

    localVouchersConsiderJsonData.pk = LocalFromMax.MaxPk + 1;
    localVouchersConsiderJsonData.FolderName = FolderName;
    localVouchersConsiderJsonData.FileName = FileName;
    localVouchersConsiderJsonData.ItemName = ItemName;

    jvarLocalNewData[jvarLocalReportName].VouchersConsider.push(localVouchersConsiderJsonData);


    let jvarLocalPushData = await CommonFromToJson.StartFunc({
        inOriginalData: ComonFromJsonData.JsonData,
        inDataToUpdate: jvarLocalNewData,
        inDataPK: jvarLocalDataPK
    });

    if (jvarLocalPushData.KTF) {
        LocalReturnData.KTF = true;

    };

    return await LocalReturnData;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SVSVS') {
        let LocalMockData = require('./CreateNew.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};


module.exports = { StartFunc };