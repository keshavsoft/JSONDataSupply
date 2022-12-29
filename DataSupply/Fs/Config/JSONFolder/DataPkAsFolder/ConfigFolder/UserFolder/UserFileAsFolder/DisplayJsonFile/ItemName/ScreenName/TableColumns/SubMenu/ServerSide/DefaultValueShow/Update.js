let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../PushData/FromFoldFile");


let Update = async ({ DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    console.log("BodyAsJson", BodyAsJson);
    const LocalDataToUpdate = (({ ControlType, Format, Type, Transform }) => ({ ControlType, Format, Type, Transform }))(BodyAsJson);
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
            if (LocalJsonTableColumnsKey in LocalNewData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute });
                LocalFindColumnObject.ServerSide.DefaultValueShow.ControlType = LocalDataToUpdate.ControlType;
                LocalFindColumnObject.ServerSide.DefaultValueShow.Format = LocalDataToUpdate.Format;
                LocalFindColumnObject.ServerSide.DefaultValueShow.Type = LocalDataToUpdate.Type;
                LocalFindColumnObject.ServerSide.DefaultValueShow.Transform = LocalDataToUpdate.Transform;

                LocalFromUpdate = await CommonFromPushData.StartFunc({
                    inFolderName: folderName,
                    inFileNameWithExtension: FileName,
                    inDataPK: LocalinDataPK,
                    inDataToUpdate: LocalNewData,
                    inOriginalData: LocalFromPullData.JsonData
                });

                //console.log("LocalFromUpdate : ", LocalFromUpdate);

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