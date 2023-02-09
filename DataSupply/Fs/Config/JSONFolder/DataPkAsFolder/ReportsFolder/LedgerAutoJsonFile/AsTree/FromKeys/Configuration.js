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

    LocalReturnData.JsonData = await LocalBuildJsonData({ inJsonData: CommonFromData.JsonData });
    LocalReturnData.KTF = true;

    return await LocalReturnData;


};

let LocalBuildJsonData = async ({ inJsonData }) => {
    let LocalReturnObject = {};
    LocalReturnObject.Reports = {};

    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.Reports[key] = {};
            LocalReturnObject.Reports[key].VouchersConsider = {};

            value.VouchersConsider.forEach(element => {
                //   LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { Active: element.Active };
                LocalReturnObject.Reports[key].VouchersConsider[element.pk] = {
                    FolderName: element.FolderName,
                    FileName: element.FileName,
                    ItemName: element.ItemName
                };

                //  LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { ...element };
            });
        }
    );

    return await LocalReturnObject;
};

let MockFunc = () => {
    StartFunc({
        inDataPK: 1022

    }).then((PromiseData) => {
        console.log("PromiseData--", PromiseData.JsonData.Reports.StockBalances);
    });
};

// MockFunc();

module.exports = { StartFunc };