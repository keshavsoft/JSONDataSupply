let CommonFromData = require("../../../PullData/FromData");
let CommonToData = require("../../../PushData/ToData");
let CommonToDisplayFolder = require("../ToDisplayFolder");
let CommonScreensInsert = require("../../Screens/Insert/Start");
let CommonTableColumnsInsertBulk = require("../../Screens/TableColumns/Insert/Bulk");
let CommonForSubTableColumnsInsertBulk = require("../../Screens/ForSubTableColumns/Insert/Bulk");

let Bulk = async ({ inJsonConfig, inToName, inItemData, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromInsert;
    let LocalFromTransform = await LocalArrayToObject({ inItemData });
    if (LocalFromTransform.KTF) {
        let LocalOriginalData = await CommonFromData.AsJsonAsync({ inJsonConfig, inUserPK });
        let LocalNewData = JSON.parse(JSON.stringify(LocalOriginalData));

        if ((inToName in LocalNewData) === false) {
            if ("KData" in LocalFromTransform) {

                LocalNewData[inToName] = LocalFromTransform.KData;

                LocalFromInsert = await CommonToData.AsAsync({
                    inJsonConfig, inUserPK,
                    inOriginalData: LocalOriginalData,
                    inDataToUpdate: LocalNewData
                });

                if (LocalFromInsert.KTF) {
                    LocalReturnData.KTF = true;
                };
            };
        };

    };

    return LocalReturnData;
};

let LocalArrayToObject = async ({ inItemData }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalReturnObject = {};

    inItemData.forEach(element => {
        if ("GUID" in element) {
            LocalReturnObject[element.GUID] = element;
        };
    });

    LocalReturnData.KTF = true;
    LocalReturnData.KData = LocalReturnObject;

    return LocalReturnData;
};

let LocalToConigFunc = async ({ inFirstRow, inToName, inJsonConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalFromScreenInsert;
    let LocalItemConfig = {
        inItemName: inToName,
        inScreenName: "Create"
    };

    let LocalFromInsert = await CommonToDisplayFolder.Insert({ inJsonConfig, inToName, inUserPK });

    if (LocalFromInsert.KTF) {
        LocalFromScreenInsert = await CommonScreensInsert.InsertWithKPk({
            inJsonConfig, inItemName: inToName,
            inScreenName: "Create", inUserPK,
            inKPk: "GUID"
        });

        if (LocalFromScreenInsert.KTF) {
            LocalReturnData.KTF = true;
            await LocalToConigColumns({ inFirstRow, LocalItemConfig, inJsonConfig, inUserPK });
        };
    };

    return await LocalReturnData;
};

let LocalToConigColumns = async ({ inFirstRow, LocalItemConfig, inJsonConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalFromColumns;
    let LocalSubTableColumns = [];

    Object.entries(inFirstRow).forEach(
        ([key, value]) => {
            if (Array.isArray(value)) {
                LocalSubTableColumns.push({
                    ColumnName: key,
                    ValueAsArray: value
                });
            }
        }
    );

    LocalFromColumns = await CommonTableColumnsInsertBulk.Insert({
        inJsonConfig,
        inItemConfig: LocalItemConfig,
        inColumnArray: Object.keys(inFirstRow),
        inUserPK
    });

    if (LocalFromColumns.KTF) {
        CommonForSubTableColumnsInsertBulk.Insert({
            inJsonConfig,
            inItemConfig: LocalItemConfig,
            inSubTableColumnArray: LocalSubTableColumns,
            inUserPK
        });
    };

    console.log("LocalFromColumns : ", LocalFromColumns);
    return await LocalReturnData;
    //console.log("CommonInsert: ", LocalFromInsert);
};

let ToConfigAlso = async ({ inJsonConfig, inToName, inItemData, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromInsert;
    
    if (inItemData.length > 0) {
        let LocalFromTransform = await LocalArrayToObject({ inItemData });
        let LocalFromConfig = await LocalToConigFunc({
            inFirstRow: inItemData[0],
            inToName,
            inJsonConfig,
            inUserPK
        });

        if (LocalFromTransform.KTF) {
            let LocalOriginalData = await CommonFromData.AsJsonAsync({ inJsonConfig, inUserPK });
            let LocalNewData = JSON.parse(JSON.stringify(LocalOriginalData));

            if ((inToName in LocalNewData) === false) {
                if ("KData" in LocalFromTransform) {
                    LocalNewData[inToName] = LocalFromTransform.KData;

                    LocalFromInsert = await CommonToData.AsAsync({
                        inJsonConfig, inUserPK,
                        inOriginalData: LocalOriginalData,
                        inDataToUpdate: LocalNewData
                    });

                    if (LocalFromInsert.KTF) {
                        LocalReturnData.KTF = true;
                    };
                };
            };

        };
    };

    return LocalReturnData;
};

module.exports = { Bulk, ToConfigAlso };
