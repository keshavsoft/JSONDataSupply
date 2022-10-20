let CommonTableFuncs = require("../../../../../../../../../../CommonTableFuncs/Save");
let CommonDataSupplyReturnDataFuncs = require("../../../../../../ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");

let StartFunc = async ({ inJsonConfig, inItemConfig, inDataPK, inPostData }) => {
    let LocalDataPK = inDataPK;
    let localFromSave;
    let LocalReturnData = { KTF: false };

    if (LocalDataPK > 0) {
        localFromSave = await CommonTableFuncs.Save({ inJsonConfig, inItemConfig, inUserPK: LocalDataPK, inPostData });

        if (localFromSave.KTF) {
            LocalReturnData.kPK = localFromSave.kPK;
            LocalReturnData.KTF = true;

            let ReturnData = await CommonDataSupplyReturnDataFuncs.VerticalSave({
                inJsonConfig, inItemConfig,
                inPK: localFromSave.kPK,
                inUserPK: LocalDataPK,
                inPostData
            });
            
            if (ReturnData !== undefined) {
                if (ReturnData.KTF) {
                    LocalReturnData.DataFromServer = ReturnData.DataFromServer;
                    LocalReturnData.KStudy = ReturnData.KStudy;
                } else {
                    if ("KReason" in ReturnData) {
                        LocalReturnData.KReason = ReturnData.KReason;
                    };
                };
            };
        };
    };
    return await LocalReturnData;
};

module.exports = {
    StartFunc
};