//let CommonDataSupplySubTableSave = require("../../../../../CommonFuns/ForSubTable/SaveFuncs");
//let CommonDataSupplyReturnDataFuncs = require("../../../../../../ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");
let CommonDataSupplySubTableSave = require("../SaveFuncs/CheckAndSaveFuncs");
let CommonDataSupplyReturnDataFuncs = require("../../../Fs/Config/Folders/Files/ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");

exports.ForSubTable = async ({ inDataPK, inJsonConfig, inItemConfig, inJsonPK, inPostData, inInsertKey }) => {
    let LocalUserPK = inDataPK;
    let ReturnData;

    let LocalJsonPK = typeof (inJsonPK) === "string" ? parseInt(inJsonPK) : inJsonPK;
    let LocalReturnObject = { KTF: false, kPK: 0 };

    if (LocalUserPK > 0) {
        let PromiseData = await CommonDataSupplySubTableSave.Save({
            inJsonConfig,
            inItemConfig,
            inUserPK: LocalUserPK,
            inPostData,
            inInsertKey, inPK: LocalJsonPK
        });
        
        if (PromiseData.KTF) {
            ReturnData = await CommonDataSupplyReturnDataFuncs.SubTableFooter({
                inJsonConfig,
                inItemConfig, inUserPK: LocalUserPK, inPK: LocalJsonPK
            });
            if (ReturnData.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = ReturnData.DataFromServer;
            } else {
                LocalReturnObject.KReason = "From Datasupply"
            };
        };
    };

    return await LocalReturnObject;
};
