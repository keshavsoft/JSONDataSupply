let _ = require("lodash");
let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../PushData/FromFoldFile");

let MockFunc = require("../../../../../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, BodyAsJson }) => {

    const LocalDataToUpdate = (({ RowEdit }) => ({ RowEdit }))(BodyAsJson);
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
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.TableRowOptions.Edit.RowEdit = LocalDataToUpdate.RowEdit;

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

if (MockFunc.AllowMock) {
    if (MockFunc.AllowMock === "") {
        UpdateKeys({
            DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
            DataAttribute: "pk",
            BodyAsJson: {
                RowEdit: true
            }
        }).then(p => {
            console.log("pppp : ", p);
        });

    };
};




module.exports = {
    Update
};