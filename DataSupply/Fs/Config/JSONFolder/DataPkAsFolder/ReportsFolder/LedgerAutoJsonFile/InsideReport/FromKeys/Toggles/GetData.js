let CommonFileData = require("../../../PullDataFromFile/FromJson");
let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromData = await CommonFileData.StartFunc({ inDataPK });

    if (CommonFromData.KTF === false) {
        LocalReturnData.KReason = CommonFromData.KReason;
        return await LocalReturnData;
    };

    if (("JsonData" in CommonFromData) === false) {
        LocalReturnData.KReason = "JsonData is Not Found..!";
        return await LocalReturnData;
    };

    LocalReturnData.JsonData = LocalBuildJsonData({ inJsonData: CommonFromData.JsonData });
    LocalReturnData.KTF = true;

    return await LocalReturnData;


};

let LocalBuildJsonData = ({ inJsonData }) => {
    let LocalReturnObject = {};
    LocalReturnObject.Reports = {};

    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.Reports[key] = {};
            LocalReturnObject.Reports[key].VouchersConsider = {};

            value.VouchersConsider.forEach(element => {
                LocalReturnObject.Reports[key].VouchersConsider[element.pk] = {
                    FolderName: element.FolderName,
                    FileName: element.FileName,
                    ItemName: element.ItemName,
                    ColumnNameToPick: element.ColumnNameToPick,
                    Active: element.Active,
                    FromFolder: element.FromFolder,
                    ItemNameConsider: element.ItemNameConsider
                };

            });
        }
    );

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'NMN') {

        StartFunc({
            inDataPK: CommonMock.DataPK
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = { StartFunc };