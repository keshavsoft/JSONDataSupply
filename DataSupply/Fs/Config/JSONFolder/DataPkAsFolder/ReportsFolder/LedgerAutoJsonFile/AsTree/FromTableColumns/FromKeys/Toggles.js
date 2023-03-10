let CommonFileData = require("../../../PullDataFromFile/FromJson");

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
            LocalReturnObject.Reports[key].TableColumns = {};

            // console.log("value",value);

            value.TableColumns.forEach(element => {
                LocalReturnObject.Reports[key].TableColumns[element.pk] = {
                    DisplayName:element.DisplayName,
                    DataAttribute:element.DataAttribute,
                    CreateNew:element.CreateNew,
                    Insert: element.Insert,
                    ShowInTable: element.ShowInTable};

            });
        }
    );

    return LocalReturnObject;
};

let MockFunc = () => {
    StartFunc({
        inDataPK: 1022

    }).then((PromiseData) => {
        // console.log("PromiseData--", PromiseData.JsonData.Reports.valuePurchases);
    });
};

MockFunc();

module.exports = { StartFunc };