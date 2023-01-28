let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../PushData/FromFoldFile");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName,subtablecolumnkey, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }) => ({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: FolderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let Localsubtablecolumnkey = subtablecolumnkey;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                if (Localsubtablecolumnkey in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns) {
                    if ("TableColumns" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey]) {

                        LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns, { DataAttribute });

                        LocalFindColumnObject.ServerSide.DefaultValueCreate.ControlType = LocalDataToUpdate.ControlType;
                        LocalFindColumnObject.ServerSide.DefaultValueCreate.IncrementBy = LocalDataToUpdate.IncrementBy;
                        LocalFindColumnObject.ServerSide.DefaultValueCreate.Type = LocalDataToUpdate.Type;
                        LocalFindColumnObject.ServerSide.DefaultValueCreate.StartValue = LocalDataToUpdate.StartValue;
                        LocalFindColumnObject.ServerSide.DefaultValueCreate.ConsiderFirmPeriod = LocalDataToUpdate.ConsiderFirmPeriod;

                        LocalFromUpdate = await CommonFromPushData.StartFunc({
                            inFolderName: FolderName,
                            inFileNameWithExtension: FileName,
                            inDataPK: LocalinDataPK,
                            inDataToUpdate: LocalNewData,
                            inOriginalData: LocalFromPullData.JsonData
                        });


                        if (LocalFromUpdate.KTF) {
                            LocalReturnObject.KTF = true;
                        };

                        return await LocalReturnObject;
                    };
                };
            };
        };
    };

    return await LocalReturnObject;
};

// UpdateKeys({
//     DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
//     DataAttribute: "pk",
//     BodyAsJson: {
//         DisplayName: "ppppppppppp"
//     }
// }).then(p => {
//     console.log("pppp : ", p);
// });


module.exports = {
    Update
};