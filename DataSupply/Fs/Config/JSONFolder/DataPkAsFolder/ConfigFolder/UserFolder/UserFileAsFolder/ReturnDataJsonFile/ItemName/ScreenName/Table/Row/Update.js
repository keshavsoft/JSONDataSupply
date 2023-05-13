let commonPullData = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DataType, KTF }) => ({ DataType, KTF }))(BodyAsJson);


    let LocalReturnObject = { KTF: false };

    let localcommonPullData = await commonPullData.StartFunc({ inFolderName, inFileNameOnly, inDataPK });

    if ((localcommonPullData.KTF) === false) {
        LocalReturnObject.KReason = localcommonPullData.KReason;

    };

    let localJsonData = localcommonPullData.JsonData;

    if ((inItemName in localJsonData) === false) {
        LocalReturnObject.KReason = `iTemName:${inItemName} not found in File`;

        return await LocalReturnObject;
    };

    if ((inScreenName in localJsonData[inItemName]) === false) {
        LocalReturnObject.KReason = `ScreenName:${inScreenName} not found in Items !`;

        return await LocalReturnObject;
    };

    if (("Table" in localJsonData[inItemName][inScreenName]) === false) {
        LocalReturnObject.KReason = `Table not found in Scrren !`;

        return await LocalReturnObject;

    };

    if (("Row" in localJsonData[inItemName][inScreenName].Table) === false) {
        LocalReturnObject.KReason = `Row not found in Table !`;

        return await LocalReturnObject;

    };

    if (("Delete" in localJsonData[inItemName][inScreenName].Table.Row) === false) {
        LocalReturnObject.KReason = `Footer not found in Vetical !`;

        return await LocalReturnObject;

    };


    if (("ReturnData" in localJsonData[inItemName][inScreenName].Table.Row.Delete) === false) {
        LocalReturnObject.KReason = `ReturnData not found in Save !`;

        return await LocalReturnObject;

    };

    localJsonData[inItemName][inScreenName].Table.Row.Delete.ReturnData.DataType = LocalDataToUpdate.DataType
    localJsonData[inItemName][inScreenName].Table.Row.Delete.ReturnData.KTF = LocalDataToUpdate.KTF

    LocalFromUpdate = await CommonFromPushData.StartFunc({
        inFolderName: inFolderName,
        inFileNameWithExtension: `${inFileNameOnly}.json`,
        inDataPK: inDataPK,
        inDataToUpdate: localJsonData,
        inOriginalData: localcommonPullData.JsonData
    });
    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    };

    return await LocalReturnObject;
};

let MockFunc = () => {

    StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "GST-SALES",
        inItemName: "GST-SALE",
        inScreenName: "Create",
        inDataPK: 1022,
        BodyAsJson: {
            DataType: "vertical",
            KTF: true
        }

    }).then(Promise => {
        console.log("Promise:", Promise);
    })
};
// MockFunc();
module.exports = { StartFunc };