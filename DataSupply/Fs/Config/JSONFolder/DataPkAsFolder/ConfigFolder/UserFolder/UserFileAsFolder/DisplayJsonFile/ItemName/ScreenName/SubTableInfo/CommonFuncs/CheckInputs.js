// let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");

let StartFunc = async ({ inItemName, inScreenName, GridName, inConfigData }) => {
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let localGridName = GridName;

    let LocalReturnObject = { KTF: false };

    let LocalNewData = inConfigData;

    if (LocalItemName in LocalNewData === false) {
        LocalReturnObject.KReason = `ItemName: ${LocalItemName} Not found.!`;
        return await LocalReturnObject;
    };

    if (LocalScreenName in LocalNewData[LocalItemName] === false) {
        LocalReturnObject.KReason = `Screen: ${LocalScreenName} Not found.!`;
        return await LocalReturnObject;
    };

    if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName] === false) {
        LocalReturnObject.KReason = `SubTableColumns Not found.!`;
        return await LocalReturnObject;
    };

    if (localGridName in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns === false) {
        LocalReturnObject.KReason = `Grid: ${localGridName} Not found.!`;
        return await LocalReturnObject;
    };

    if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName] === false) {
        LocalReturnObject.KReason = `TableInfo Not found.!`;
        return await LocalReturnObject;
    };

    if ("FooterType" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo === false) {
        LocalReturnObject.KReason = `FooterType Not found.!`;
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;

    return await LocalReturnObject;
};

module.exports = {
    StartFunc
};