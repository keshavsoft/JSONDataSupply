let localPullDataJsonData = require("../PullData/AsJson");
let localPushDataJsonData = require("../PushData/FromFoldFile");

let StartFunc = async ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inToItemName }) => {
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;
    let localinToItemName = inToItemName;
    let localItemNameObject;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let localJsonData = await localPullDataJsonData.StartFunc({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly, inDataPK: localinDataPK
    });

    LocalReturnObject = { ...localJsonData };

    let localNewJsonDate = localJsonData.JsonData;
    let localoldItemData = localJsonData.JsonData;

    if (localJsonData.KTF === false) {
        LocalReturnObject.KReason = localJsonData.KReason;

        return await LocalReturnObject;
    };

    if (localinItemName in localNewJsonDate === false) {
        LocalReturnObject.KReason = `ItemName : ${localinItemName} not found in config.json!`;

        return await LocalReturnObject;
    };

    if (localinToItemName in localNewJsonDate) {
        LocalReturnObject.KReason = `inToItemName:${localinToItemName} found in file..!`;

        return await LocalReturnObject;
    };

    localItemNameObject = localNewJsonDate[localinItemName];

    localNewJsonDate = {};
    localNewJsonDate = localoldItemData;
    localNewJsonDate[localinToItemName] = localItemNameObject;

    let localpush = localPushDataJsonData.StartFunc({
        inFolderName: localinFolderName,
        inFileNameWithExtension: `${localinFileNameOnly}.json`,
        inOriginalData: localJsonData.JsonData,
        inDataToUpdate: localNewJsonDate,
        inDataPK: localinDataPK
    });

    if (localpush.KTF) {
        LocalReturnObject.KTF = true
    };

    return await LocalReturnObject;
};

let localMockFunc = async () => {
    let FromStartFunc = await StartFunc({
        inDataPK: 1022,
        inFolderName: "Transactions",
        inFileNameOnly: "GST-PURCHASES",
        inItemName: "GST-PURCHASE",
        inToItemName: "GST-PURCHASE1"
    });

    console.log("FromStartFunc", FromStartFunc);

};
// uncomment next 2 lines to run the mock func
// localMockFunc().then((PromiseData) => {
// });

module.exports = { StartFunc };
