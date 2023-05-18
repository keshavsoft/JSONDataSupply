let CommonFromPushData = require("./FromFolderFileItemNameWithpk");
let CommonFromPullData = require("../PullData/FromFolderFileItemName");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inDataToInsert }) => {

    const LocalDataObject = (({ pk }) => ({ pk }))(inDataToInsert)

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let localpk = LocalDataObject.pk

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromPullData = CommonFromPullData.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromPullData.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromPullData.KReason;
        return await LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonFromPullData.JsonData));

    if (localpk in LocalNewData) {
        LocalReturnData.KReason = `${localpk} Already Found !`;

        return await LocalReturnData;
    };

    if ((localpk in LocalNewData) === false) {

        let LocalFromCommonFromPushDataToFile = await CommonFromPushData.StartFunc({
            inFolderName: LocalinFolderName,
            inFileNameOnly: LocalinFileNameOnly,
            inItemName: LocalinItemName,
            inpk: localpk,
            inDataToInsert: inDataToInsert,
            inDataPK: LocalinDataPK
        });

        if (LocalFromCommonFromPushDataToFile.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonFromPushDataToFile.KReason;
            return await LocalReturnData;
        };

        LocalReturnData.KTF = true;
        LocalReturnData.NewRowPK = localpk;
    };

    return await LocalReturnData;
};

// console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
//     inFolderName: "Transactions",
//     inFileNameOnly: "GST-SALES",
//     inItemName: "FERTLIZERS-GST--SALES",
//     inDataPK: 1024
// }).JsonData[0]);

module.exports = { StartFunc };
