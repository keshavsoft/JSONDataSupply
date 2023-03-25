let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../PushData/FromFoldFile");

let Clone = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, DuplicateScreenName }) => {
    console.log("----------:",DataPK, FolderName, FileName, ItemName, ScreenName, DuplicateScreenName);
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: FolderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let localDuplicateScreenName = DuplicateScreenName
    let localNeededScreen;
    let LocalFromUpdate;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if ((LocalItemName in LocalNewData) === false) {
        LocalReturnObject.KReason = `itemName: ${LocalItemName} not fond !`
        return await LocalReturnObject;
    };

    if (localDuplicateScreenName in LocalNewData[LocalItemName]) {
        LocalReturnObject.KReason = `ScreenName: ${localDuplicateScreenName} already fond !`
        return await LocalReturnObject;
    };

    localNeededScreen = LocalNewData[LocalItemName][LocalScreenName];

    if ((localDuplicateScreenName in LocalNewData[LocalItemName]) === false) {
        LocalNewData[LocalItemName][localDuplicateScreenName] = localNeededScreen;

        LocalFromUpdate = await CommonFromPushData.StartFunc({
            inFolderName: FolderName,
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
    Clone
};