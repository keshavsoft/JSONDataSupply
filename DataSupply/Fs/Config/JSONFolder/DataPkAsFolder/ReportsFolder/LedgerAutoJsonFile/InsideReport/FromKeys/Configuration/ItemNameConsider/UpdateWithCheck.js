let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullDataFromFile/FromJson");
let CommonToUpdata = require("./Update");

let CommonMock = require("../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, VoucherPk, ReportName, FolderName, FileName, ItemName, ItemNameConsider }) => {

    let LocalinDataPK = DataPK;
    let LocalReportName = ReportName;
    let LocalVouchersConsiderPk = parseInt(VoucherPk);
    let LocalFromUpdate;

    let LocalFromPullData = await CommonPullDataFromConfig.StartFunc({
        inDataPK: LocalinDataPK
    });

    let LocalReturnObject = { ...LocalFromPullData };
    LocalReturnObject.KTF = false

    if (LocalFromPullData.KTF === false) {
        return LocalReturnObject;
    };

    if ((LocalReportName in LocalReturnObject.JsonData) === false) {
        LocalReturnObject.KReason = ` ReportName : ${LocalReportName} not found !`
        return LocalReturnObject;
    };

    let LocalFilterObject = {};
    LocalFilterObject.pk = LocalVouchersConsiderPk;
    LocalFindColumnObject = _.find(LocalReturnObject.JsonData[LocalReportName].VouchersConsider, LocalFilterObject);

    if ((LocalFindColumnObject.pk === LocalVouchersConsiderPk) === false) {
        LocalReturnObject.KReason = ` VouchersConsiderPk : ${LocalVouchersConsiderPk} not found !`
        return LocalReturnObject;
    };

    if ((LocalFindColumnObject.FolderName === FolderName) === false && LocalFindColumnObject.FolderName === "") {
        LocalReturnObject.KReason = ` FolderName : ${FolderName} not found !`
        return LocalReturnObject;
    };

    if ((LocalFindColumnObject.FileName === FileName) === false && LocalFindColumnObject.FileName === "") {
        LocalReturnObject.KReason = ` FileName : ${FolderName} not found !`
        return LocalReturnObject;
    };
    if ((LocalFindColumnObject.ItemName === ItemName) === false && LocalFindColumnObject.ItemName === "") {
        LocalReturnObject.KReason = ` ItemName : ${ItemName} not found !`
        return LocalReturnObject;
    };
    if ((LocalFindColumnObject.ItemNameConsider === ItemNameConsider) === false && LocalFindColumnObject.ItemNameConsider === "") {
        LocalReturnObject.KReason = ` ItemName : ${ItemNameConsider} not found !`
        return LocalReturnObject;
    };

    LocalFromUpdate = await CommonToUpdata.Update({
        DataPK: LocalinDataPK,
        VoucherPk: LocalVouchersConsiderPk,
        ReportName: LocalReportName,
        FolderName,
        FileName,
        ItemName,
        ItemNameConsider
    });
    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;

};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'MVN') {
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