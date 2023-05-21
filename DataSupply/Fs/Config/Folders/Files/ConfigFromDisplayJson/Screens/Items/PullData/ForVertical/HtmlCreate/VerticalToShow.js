let CommonDisplayPullData = require("../../../../../../Items/Screens/Config/FromDisplayJson/PullData");
let CommonFilesPullData = require("../../../../../../Items/PullData/FromDataFolder/Pull");
let CommonReOrder = require("../../../../../../../../../../CommonTableFuncs/TableFuncs/ReOrder");
let CommonForVertical = require("./CommonFuncs/ForVertical");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let LocalPrepareTables = ({ inDisplayData }) => {
    let LocalSubTableColumns;
    let LocalArray = [];
    let LocalReturnArrayObject;

    if (inDisplayData.hasOwnProperty("SubTableColumns")) {
        LocalSubTableColumns = inDisplayData.SubTableColumns;

        for (const property in LocalSubTableColumns) {
            LocalReturnArrayObject = { HTMLControlType: "SubTable", KData: { TableData: [], TableInfo: {} } };

            LocalReturnArrayObject.KData.TableColumns = CommonReOrder.StartFunc({
                inTableColumns: LocalSubTableColumns[property].TableColumns,
                inTableInfo: LocalSubTableColumns[property].TableInfo
            });

            LocalReturnArrayObject.KData.TableInfo = LocalSubTableColumns[property].TableInfo;

            LocalArray.push(LocalReturnArrayObject);
        };
    };

    return LocalArray;
};

let StartFunc = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalSubTableArray = [];
    let LocalItemName = inItemConfig.inItemName;
    let LocalReturnObject = { KTF: false, DataFromServer: [] };

    if (inDataPK > 0) {
        try {
            let LocalDisplayData = await CommonDisplayPullData.FromJsonAndItemConfig({
                inJsonConfig,
                inItemConfig,
                inDataPK
            });

            if (LocalDisplayData.KTF) {
                let LocalUserData = await CommonFilesPullData.AsJsonAsync({
                    inJsonConfig,
                    inItemName: LocalItemName, inDataPK
                });

                let LocalVerticalObject = CommonForVertical.StartFunc({
                    inJsonConfig, inItemConfig,
                    inUserPK: inDataPK,
                    inDisplayData: LocalDisplayData.DisplayJsonData,
                    inUserData: LocalUserData
                });

                LocalVerticalObject.HTMLControlType = "VerticalToShow";

                LocalSubTableArray = LocalPrepareTables({
                    inJsonConfig, inItemConfig,
                    inUserPK: inDataPK, inDisplayData: LocalDisplayData.DisplayJsonData, inUserData: LocalUserData
                });

                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = [LocalVerticalObject, ...LocalSubTableArray];
            };
            return await LocalReturnObject;
            //return await { KTF: true, DataFromServer:  };
        } catch (error) {
            console.log("error--------- : ", error);
        };
    };
};

if (CommonMock.AllowMock) {
    let LocalForMock = require("./VerticalToShow.json");

    StartFunc(LocalForMock).then(PromiseData => {
        console.log("PromiseData : ", PromiseData);
    });
};

module.exports = { StartFunc };
