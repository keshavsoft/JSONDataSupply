let _ = require("lodash");

//let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");

let CommonFromPushData = require("../../../../../PushData/FromFoldFile");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, BodyAsJson }) => {

    const LocalDataToUpdate = (({ ColumnReOrder,ShowFooter,DataAttributesFromTableInfo,DataAttributesFromTableDataRow }) => ({ ColumnReOrder,ShowFooter,DataAttributesFromTableInfo,DataAttributesFromTableDataRow }))(BodyAsJson);
    console.log("BodyAsJson",BodyAsJson);

    let LocalinDataPK = DataPK;

    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromFoldFile({
        inFolderName: FolderName,
        inFileNameWithExtension: `${FileName}.json`,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName]) {
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.ShowFooter = LocalDataToUpdate.ShowFooter;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.ColumnReOrder = LocalDataToUpdate.ColumnReOrder;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.DataAttributesFromTableInfo = LocalDataToUpdate.DataAttributesFromTableInfo;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.DataAttributesFromTableDataRow = LocalDataToUpdate.DataAttributesFromTableDataRow;

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