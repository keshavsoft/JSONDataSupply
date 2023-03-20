let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");

let Create = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, subtablecolumnkey, ColumnName }) => {
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: FolderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let Localsubtablecolumnkey = subtablecolumnkey;
    let localColumnName = ColumnName;
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
                        if ((localColumnName in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns) === false) {



                        };
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
    Create
};