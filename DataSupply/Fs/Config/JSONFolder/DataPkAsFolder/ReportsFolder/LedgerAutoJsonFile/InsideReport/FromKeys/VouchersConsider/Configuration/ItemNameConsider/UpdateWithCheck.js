let _ = require("lodash");

let CommonCheckPk = require("../../CheckPk");

let CommonToUpdata = require("./Update");
let CommonItemCheck = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/CheckItemName");

let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, VoucherPk, ReportName, FolderName, FileName, ItemName, ItemNameConsider }) => {
    let LocalinDataPK = DataPK;
    let LocalReportName = ReportName;
    let LocalVouchersConsiderPk = parseInt(VoucherPk);
    let LocalFromUpdate;
    let localFolderName = FolderName;
    let localFileName = FileName;
    let localItemName = ItemName;

    let LocalFromPullData = CommonCheckPk.StartFunc({
        DataPK: LocalinDataPK,
        ReportName: LocalReportName,
        VoucherPk: LocalVouchersConsiderPk
    });

    let LocalReturnObject = { ...LocalFromPullData };
    LocalReturnObject.KTF = false

    if (LocalFromPullData.KTF === false) {
        return LocalReturnObject;
    };

    let localCommonCheck = CommonItemCheck.StartFuncNoSync({
        inFolderName: localFolderName,
        inFileNameOnly: localFileName,
        inItemName: localItemName,
        inDataPK: LocalinDataPK
    });

    LocalReturnObject = { ...localCommonCheck };
    LocalReturnObject.KTF = false;
    
    if (localCommonCheck.KTF === false) {
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
    if (CommonMock.MockKey === 'SSVM') {
        let LocalMockData = require('./Update.json');

        Update({
            DataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData.KTF);

        });
    };
};

module.exports = {
    Update
};