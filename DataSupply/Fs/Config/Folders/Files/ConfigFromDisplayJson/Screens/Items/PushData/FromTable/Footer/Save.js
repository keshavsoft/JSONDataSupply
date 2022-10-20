let CommonDataSupplySubTableSave = require("../../../../../CommonFuns/ForSubTable/SaveFuncs");
let CommonDataSupplyVerticalSave = require("../../FromVertical/Save");
let CommonDataSupplyReturnDataFuncs = require("../../../../../../ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");

exports.StartFunc = async ({ inDataPK, inJsonConfig, inItemConfig, inJsonPK, inPostData, inInsertKey }) => {
    let LocalUserPK = inDataPK;
    let ReturnData;

    let LocalJsonPK = typeof (inJsonPK) === "string" ? parseInt(inJsonPK) : inJsonPK;
    let LocalReturnObject = { KTF: false, kPK: 0 };
    
    if (LocalUserPK > 0) {
        if (LocalJsonPK > 0) {
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
        } else {
            let LocalFromVerticalSave = await CommonDataSupplyVerticalSave.CheckAndSave({
                inJsonConfig,
                inItemConfig, inDataPK: LocalUserPK, inPostData
            });

            if (LocalFromVerticalSave.KTF) {
                ReturnData = await CommonDataSupplyReturnDataFuncs.TableFooter({
                    inJsonConfig,
                    inItemConfig, inUserPK: LocalUserPK,
                    inPK: LocalJsonPK,
                    inPostData
                });
                if (ReturnData.KTF) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.DataFromServer = ReturnData.DataFromServer;
                } else {
                    LocalReturnObject.KReason = "From Datasupply"
                };
            };
        };
    };

    return await LocalReturnObject;
};

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
