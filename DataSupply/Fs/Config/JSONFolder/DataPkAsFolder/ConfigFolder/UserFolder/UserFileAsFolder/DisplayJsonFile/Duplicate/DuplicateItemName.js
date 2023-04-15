let localPullDataJsonData = require("../PullData/AsJson");
let localPushDataJsonData = require("../PushData/FromFoldFile");

let StartFucn = async ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inToItemName }) => {
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;
    let localinToItemName = inToItemName;
    let localItemNameObject;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let localJsonData = await localPullDataJsonData.StartFunc({ inFolderName: localinFolderName, inFileNameOnly: localinFileNameOnly, inDataPK: localinDataPK });

    let localNewJsonDate = localJsonData.JsonData;
    let localoldItemData = localJsonData.JsonData;

    if (localJsonData.KTF === false) {
        LocalReturnObject.KReason = localJsonData.KReason;

        return await LocalReturnObject;
    };

    if (localinToItemName in localNewJsonDate) {
        LocalReturnObject.KReason = `inToItemName:${localinToItemName} found in file..!`;

        return await LocalReturnObject;
    };

    if (localinItemName in localNewJsonDate) {
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

    return await LocalReturnObject;
};

let localMockFunc = async () => {
    StartFucn({
        inDataPK: 1022, inFolderName: "Transactions", inFileNameOnly: "GST-SALES", inItemName: "GST-SALE", inToItemName: "GST-SALE2"
    });

};

// localMockFunc().then((PromiseData) => {
//     console.log("PromiseData", PromiseData);
// });

module.exports = { StartFucn };
