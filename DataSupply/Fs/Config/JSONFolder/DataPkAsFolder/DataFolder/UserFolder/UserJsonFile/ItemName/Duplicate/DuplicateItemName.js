let CommonCheck = require("../Check");
let CommonFromPushData = require("../PushData/ItemNameWithContent");
let fs = require("fs-extra");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inToItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    //let LocalReturnData = { KTF: false, KReason: "" };

    let localFromCommonCheck = await CommonCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName,
        inDataPK
    });

    let LocalReturnData = { ...localFromCommonCheck };
    LocalReturnData.KTF = false;

    if (localFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = localFromCommonCheck.KReason;

        return await LocalReturnData;
    };

    let localFrominToFileName = await CommonCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: inToItemName,
        inDataPK
    });

    if (localFrominToFileName.KTF) {
        LocalReturnData.KReason = `ItemName : ${inToItemName} already present in Json File : ${inFileNameOnly}`;

        return await LocalReturnData;
    };

    let LocalFromCommonFromPushData = CommonFromPushData.StartFuncNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: inFileNameOnly,
        inItemName: inToItemName,
        inDataPK,
        inItemNameContent: localFromCommonCheck.JsonData[inItemName]
    });
    
    if (LocalFromCommonFromPushData.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromPushData.KReason;

        return await LocalReturnData;
    };

    return LocalFromCommonFromPushData;
};

let localMockFunc = async () => {
    let FromStartFunc = await StartFunc({
        inDataPK: 1023,
        inFolderName: "Transactions",
        inFileNameOnly: "GST-PURCHASES",
        inItemName: "GST-PURCHASE",
        inToItemName: "GST-PURCHASE8"
    });

    console.log("-----------", FromStartFunc);

};

// localMockFunc();

module.exports = { StartFunc };