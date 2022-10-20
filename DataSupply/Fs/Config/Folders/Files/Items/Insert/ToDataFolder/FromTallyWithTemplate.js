let CommonFromData = require("../../../PullData/FromData");
let CommonToData = require("../../../PushData/ToData");
let CommonToDisplayFolder = require("../ToDisplayFolder");

let CommonScreensInsert = require("../../Screens/Insert/ToDisplayFolder/FromTemplate");

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

    let LocalFromInsert = await CommonToDisplayFolder.Insert({ inJsonConfig, inToName, inUserPK });

    if (LocalFromInsert.KTF) {
        LocalFromScreenInsert = await CommonScreensInsert.FromTemplate({
            inJsonConfig,
            inItemName: inToName,
            inUserPK,
            inFirstRow
        });

        if (LocalFromScreenInsert.KTF) {
            LocalReturnData.KTF = true;
            //await LocalToConfigColumns({ inFirstRow, LocalItemConfig, inJsonConfig, inUserPK });
        };
    };

    return await LocalReturnData;
};

let BulkInsert = async ({ inJsonConfig, inToName, inItemData, inUserPK, inGuid }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalFromInsert;

    if (inItemData.length > 0) {
        let LocalFromTransform = await LocalArrayToObject({ inItemData, inGuid });
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

module.exports = { BulkInsert };
