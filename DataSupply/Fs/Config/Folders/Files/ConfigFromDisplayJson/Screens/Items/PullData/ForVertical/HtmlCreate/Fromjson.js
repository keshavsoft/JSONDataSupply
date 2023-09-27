let CommonDefaultValue = require("../../../../../../../../../../ToUi/CalculateDefaultValue");
let CommonDisplayPullData = require("../../../../../../Items/Screens/Config/FromDisplayJson/PullData");
let CommonFilesPullData = require("../../../../../../Items/PullData/FromDataFolder/Pull");
let CommonReOrder = require("../../../../../../../../../../CommonTableFuncs/TableFuncs/ReOrder");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let LocalPrepareVertical1 = ({ inJsonConfig, inItemConfig, inDisplayData, inUserData }) => {
    let LocalReturnArrayObject = { HTMLControlType: "Vertical", KData: {} };

    let LocalUserDataNeeded = inUserData;
    let LocalColumnsWithCreateNew = inDisplayData.TableColumns.filter(element => element.CreateNew);

    LocalReturnArrayObject.KData.TableColumns = LocalColumnsWithCreateNew;

    //LocalReturnArrayObject.KData.TableColumns = inDisplayData.TableColumns.filter(element => element.CreateNew);

    LocalReturnArrayObject.KData.TableInfo = inDisplayData.TableInfo;

    CommonDefaultValue.CalculateDefaultValue({
        inColumns: LocalReturnArrayObject.KData.TableColumns,
        inData: LocalUserDataNeeded,
    });

    if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };

    LocalReturnArrayObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
    LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

    return LocalReturnArrayObject;
};

let LocalPrepareVertical = {
    StartFunc: ({ inJsonConfig, inItemConfig, inDisplayData, inUserData }) => {
        let LocalReturnArrayObject = { HTMLControlType: "Vertical", KData: {} };

        let LocalUserDataNeeded = inUserData;

        LocalReturnArrayObject.KData.TableColumns = LocalPrepareVertical.CommonFuncs.ForTableColumns({
            inDisplayData,
            inUserData: LocalUserDataNeeded
        });

        LocalReturnArrayObject.KData.TableInfo = LocalPrepareVertical.CommonFuncs.ForTableInfo({
            inDisplayData,
            inJsonConfig,
            inItemConfig
        });

        return LocalReturnArrayObject;
    },
    CommonFuncs: {
        ForTableInfo: ({ inDisplayData, inJsonConfig, inItemConfig }) => {
            let LocalReturnTableInfo = inDisplayData.TableInfo;

            if (!LocalReturnTableInfo.hasOwnProperty("DataAttributes")) { LocalReturnTableInfo.DataAttributes = {} };

            LocalReturnTableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
            LocalReturnTableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

            return LocalReturnTableInfo;
        },
        ForTableColumns: ({ inDisplayData, inUserData }) => {
            let LocalReturnTableColumns = [];

            let LocalUserDataNeeded = inUserData;

            let LocalColumnsWithCreateNew = inDisplayData.TableColumns.filter(element => element.CreateNew);

            LocalReturnTableColumns = LocalColumnsWithCreateNew;

            CommonDefaultValue.CalculateDefaultValue({
                inColumns: LocalReturnTableColumns,
                inData: LocalUserDataNeeded,
            });

            return LocalReturnTableColumns;
        }
    }
};

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

let ShowWithDataPK = async ({ inFolderName, inFileName, inItemName, inScreenName, inDataPK }) => {

    let inJsonConfig = { inFolderName, inJsonFileName: inFileName };
    let inItemConfig = { inItemName, inScreenName };
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

                let LocalVerticalObject = LocalPrepareVertical.StartFunc({
                    inJsonConfig, inItemConfig,
                    inUserPK: inDataPK,
                    inDisplayData: LocalDisplayData.DisplayJsonData,
                    inUserData: LocalUserData
                });

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
    if (CommonMock.MockKey === 'KKKSS') {
        let LocalMockData = require('./Fromjson.json');

        ShowWithDataPK({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);
        });
    };
};

module.exports = { ShowWithDataPK };
