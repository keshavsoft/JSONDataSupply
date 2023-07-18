let CommonCheck         =    require("../../../../../DataFolder/UserFolder/UserJsonFile/ItemName/Check");
let CommonFromPushData  =    require("./Update");
let CommonMock          =    require("../../../../../../../../../MockAllow.json");

let StartFunc = async ({ DataPK, ItemName, voucher, BodyAsJson }) => {

    let LocalinDataPK = DataPK;
    let LocalReportName = ItemName;
    let LocalVouchersConsiderPk = parseInt(voucher);
    let localFolderName = BodyAsJson.FolderName;
    let localFileName = BodyAsJson.FileName;
    let localItemName = BodyAsJson.ItemName;
    let localGridName = BodyAsJson.ColumnNameToPick;

    let LocalFromUpdate;

    let LocalCommonCheck = await CommonCheck.StartFunc({
        inDataPK: LocalinDataPK,
        inFolderName: localFolderName,
        inFileNameOnly: localFileName,
        inItemName: localItemName
    });

    let LocalReturnObject = { ...LocalCommonCheck };
    LocalReturnObject.KTF = false;

    if (LocalCommonCheck.KTF === false) {
        return LocalReturnObject;
    };
    Object.entries(LocalReturnObject.JsonData[localItemName]).forEach(([key, value]) => {

        if (localGridName in value === false) {
            LocalReturnObject.KReason = `Grid Name : ${localGridName} Not found ! `;
            return LocalReturnObject;
        };
    });

    LocalFromUpdate = await CommonFromPushData.Update({
        DataPK: LocalinDataPK,
        ItemName: LocalReportName, voucher: LocalVouchersConsiderPk, BodyAsJson
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;

};
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SVN') {
        let LocalMockData = require('./UpdateWithCheck.json');

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