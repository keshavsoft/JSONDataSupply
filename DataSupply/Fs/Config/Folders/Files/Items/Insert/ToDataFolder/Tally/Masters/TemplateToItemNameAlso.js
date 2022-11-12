let CommonFromData = require("../../../../../PullData/FromData");
let CommonToData = require("../../../../../PushData/ToData");
let CommonFromTemplateConsiderFileNameJson = require("../../../../Screens/Insert/ToDisplayForFileJson/FromTemplateConsiderFileNameJson");

let LocalArrayToObject = async ({ inItemData, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalReturnObject = {};

    inItemData.forEach(element => {
        if (inGuid in element) {
            LocalReturnObject[element[inGuid]] = element;
        };
    });

    LocalReturnData.KTF = true;
    LocalReturnData.KData = LocalReturnObject;

    return LocalReturnData;
};

let LocalToConigFunc = async ({ inFirstRow, inToName, inJsonConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [], KData: {} };
    let LocalFromScreenInsert;
    try {
        LocalFromScreenInsert = await CommonFromTemplateConsiderFileNameJson.FromTemplate({
            inJsonConfig,
            inItemName: inToName,
            inUserPK,
            inFirstRow
        });

        if (LocalFromScreenInsert.KTF) {
            LocalReturnData.KTF = true;
            //   await LocalToConfigColumns({ inFirstRow, LocalItemConfig, inJsonConfig, inUserPK });
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

let LocalToDataFolderFunc = async ({ inItemData, inToName, inJsonConfig, inUserPK, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromTransform = await LocalArrayToObject({ inItemData, inGuid });
    if (LocalFromTransform.KTF) {
        ClassInsertNewColumns.StartFunc({ inData: LocalFromTransform.KData });
    };

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

    return await LocalReturnData;
};

class ClassInsertNewColumns {
    static StartFunc = ({ inData }) => {
        let LocalReturnData = { KTF: false, KResult: [], KData: {} };

        LocalReturnData.KTF = true;
        LocalReturnData.KData = inData;

        return LocalReturnData;
    }
};

let BulkInsert = async ({ inJsonConfig, inToName, inItemData, inUserPK, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromInsert;
    if (inItemData.length > 0) {
        let LocalFromConfig = await LocalToConigFunc({
            inFirstRow: inItemData[0],
            inToName,
            inJsonConfig,
            inUserPK
        });

        LocalFromInsert = await LocalToDataFolderFunc({ inItemData, inToName, inJsonConfig, inUserPK, inGuid });

        if (LocalFromInsert.KTF) {
            LocalReturnData.KTF = true;
        };
    };

    return LocalReturnData;
};

module.exports = { BulkInsert };
