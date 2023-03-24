let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../../../SaveFuncs");

let SaveOnly = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK }) => {
    let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
    let LocalDataWithKey = LocalDataToBeInserted[inItemName];
    
    let LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalDataWithKey });
    let LocalReturnObject = { KTF: false, kPK: 0 };

    LocalDataWithKey[LocalNewPk] = inPostData;

    if ("pk" in inPostData) {
        inPostData.pk = LocalNewPk;
    };

    let PromiseData = await CommonFilesPushData.AsAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted });

    if (PromiseData.KTF === true) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.kPK = LocalNewPk;
    };

    return await LocalReturnObject;
};

// LocalMockFunc().then();

module.exports = {
    SaveOnly
};
