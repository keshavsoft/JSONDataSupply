// let CommonTableFuncs = require("../../../../../../../../../CommonTableFuncs/Update");
//let CommonReturnDataFuncs = require("../../../../../../../../../ReturnDataFuncs");
let CommonDataSupplyReturnDataFuncs = require("../../../../../ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");
let CommonTableFuncs = require("../../../../../../../../../CommonTableFuncs/MainTable/UpdateFuncs/WithTransformBeforeSave");

let StartFunc = async ({ inJsonConfig, inItemConfig, inDataPK, inPostData, inRowPK }) => {
    let LocalDataPK = inDataPK;
    let localFromSave;
    let LocalReturnData = { KTF: false };

    if (LocalDataPK > 0) {
        // localFromSave = await CommonTableFuncs.WithTransformBeforeSave({
        //     inJsonConfig, inItemConfig,
        //     inUserPK: LocalDataPK,
        //     inPostData, inRowPK
        // });

        localFromSave = await CommonTableFuncs.StartFunc({
            JsonConfig: inJsonConfig,
            ItemConfig: inItemConfig,
            inUserPK: LocalDataPK,
            inDataToUpdate: inPostData,
            pk: inRowPK
        });

        if (localFromSave.KTF) {
            LocalReturnData.kPK = localFromSave.kPK;

            let ReturnData = await CommonDataSupplyReturnDataFuncs.VerticalUpdate({
                inJsonConfig, inItemConfig,
                inPK: localFromSave.kPK,
                inUserPK: LocalDataPK,
                inPostData
            });

            if (ReturnData.KTF === false) {
                LocalReturnData.KReason = ReturnData.KReason;

                return await LocalReturnData;
            };

            LocalReturnData.KTF = true;

            if (ReturnData !== undefined) {
                if (ReturnData.KTF) {
                    LocalReturnData.DataFromServer = ReturnData.DataFromServer;
                } else {
                    LocalReturnData.KReason = ReturnData.KReason;
                };
            };
        };
    };

    return await LocalReturnData;
};

module.exports = {
    StartFunc
};