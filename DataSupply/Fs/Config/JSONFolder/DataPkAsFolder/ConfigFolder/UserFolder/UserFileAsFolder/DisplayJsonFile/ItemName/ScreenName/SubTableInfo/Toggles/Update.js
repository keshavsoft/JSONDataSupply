let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");

let CommonFromPushData = require("../../../../PushData/FromFoldFile");

let StartFunc = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, GridName, BodyAsJson }) => {

    const LocalDataToUpdate = (({ HeadRowSearch, ShowFooter, DataAttributesFromTableInfo, DataAttributesFromTableDataRow }) => ({ HeadRowSearch, ShowFooter, DataAttributesFromTableInfo, DataAttributesFromTableDataRow }))(BodyAsJson);
    console.log("BodyAsJson", BodyAsJson);

    let LocalinDataPK = DataPK;

    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let localGridName = GridName;
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
            if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                if (localGridName in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns) {
                    if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName]) {

                        LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.HeadRowSearch = LocalDataToUpdate.HeadRowSearch
                        LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.ShowFooter = LocalDataToUpdate.ShowFooter
                        LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.DataAttributesFromTableInfo = LocalDataToUpdate.DataAttributesFromTableInfo
                        LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.DataAttributesFromTableDataRow = LocalDataToUpdate.DataAttributesFromTableDataRow



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
    StartFunc
};