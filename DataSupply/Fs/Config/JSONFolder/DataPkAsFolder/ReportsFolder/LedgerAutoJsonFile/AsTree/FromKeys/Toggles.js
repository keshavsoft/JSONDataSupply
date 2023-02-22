let CommonFileData = require("../../PullDataFromFile/FromJson");

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
console.log("jatin");
    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.Reports[key] = {};
            LocalReturnObject.Reports[key].VouchersConsider = {};

            value.VouchersConsider.forEach(element => {
                //   LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { Active: element.Active };
                LocalReturnObject.Reports[key].VouchersConsider[element.pk] = {
                    FolderName:element.FolderName,
                    FileName:element.FileName,
                    ItemName:element.ItemName,
                    ColumnNameToPick: element.ColumnNameToPick,
                    Active: element.Active,
                    FromFolder: element.FromFolder,
                    ItemNameConsider: element.ItemNameConsider};

                //  LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { ...element };
            });
        }
    );

    return LocalReturnObject;
};

let MockFunc = () => {
    StartFunc({
        inDataPK: 301

    }).then((PromiseData) => {
        console.log("PromiseData--", PromiseData.JsonData.Reports.StockBalances);
    });
};

//MockFunc();

module.exports = { StartFunc };