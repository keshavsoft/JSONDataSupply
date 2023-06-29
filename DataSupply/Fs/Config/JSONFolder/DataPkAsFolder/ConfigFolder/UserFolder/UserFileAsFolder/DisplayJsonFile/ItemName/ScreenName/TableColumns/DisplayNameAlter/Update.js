let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");

let MockFunc = require("../../../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DisplayName }) => ({ DisplayName }))(BodyAsJson);

    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: FolderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
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
            if ("TableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute });

                LocalFindColumnObject.DisplayName = LocalDataToUpdate.DisplayName;

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
    if (MockFunc.MockKey == "vvM") {
        UpdateKeys({
            DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
            DataAttribute: "pk",
            BodyAsJson: {
                DisplayName: "ppppppppppp"
            }
        }).then(p => {
            console.log("pppp : ", p);
        });
    };
};



module.exports = {
    Update
};