let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../PushData/FromFoldFile");


let Update = async ({ DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ Parent1Class, Parent2Class, Parent3Class, InputClass }) => ({ Parent1Class, Parent2Class, Parent3Class, InputClass }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: folderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };
    let LocalJsonTableColumnsKey = "TableColumns";

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                if ("FinGrid" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns) {
                    if ("TableColumns" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns.FinGrid) {

                        LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].SubTableColumns.FinGrid.TableColumns, { DataAttribute });

                        LocalFindColumnObject.ParentClasses.Parent1Class = LocalDataToUpdate.Parent1Class;
                        LocalFindColumnObject.ParentClasses.Parent2Class = LocalDataToUpdate.Parent2Class;
                        LocalFindColumnObject.ParentClasses.Parent3Class = LocalDataToUpdate.Parent3Class;
                        LocalFindColumnObject.ParentClasses.InputClass = LocalDataToUpdate.InputClass;

                        LocalFromUpdate = await CommonFromPushData.StartFunc({
                            inFolderName: folderName,
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