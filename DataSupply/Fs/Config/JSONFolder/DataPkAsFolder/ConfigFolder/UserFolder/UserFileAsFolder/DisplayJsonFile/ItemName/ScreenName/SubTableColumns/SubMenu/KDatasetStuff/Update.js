let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../PushData/FromFoldFile");


let Update = async ({ DataPK, folderName, FileName, ItemName, ScreenName,subtablecolumnkey, DataAttribute, BodyAsJson }) => {
    console.log("BodyAsJson", BodyAsJson);
    const LocalDataToUpdate = (({ Validate, DataListReverse, Type }) => ({ Validate, DataListReverse, Type }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: folderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };
    let Localsubtablecolumnkey = subtablecolumnkey;

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

                        LocalFindColumnObject.KDatasetStuff.Validate = LocalDataToUpdate.Validate;
                        LocalFindColumnObject.KDatasetStuff.Type = LocalDataToUpdate.Type;
                        LocalFindColumnObject.KDatasetStuff.DataListReverse = LocalDataToUpdate.DataListReverse;

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