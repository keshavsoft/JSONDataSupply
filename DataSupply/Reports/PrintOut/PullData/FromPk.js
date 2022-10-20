let CommonFromRowPK = require("../../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/FromRowPK");
let CommonPrepareData = require("../PrepareData");

exports.StartFunc = async ({ inJsonConfig, inItemConfig, inRowPK, inDataPK }) => {
    let LocalDataPK = inDataPK;
    //let LocalReturnObject;
    let LocalItemName = inItemConfig.inItemName;
    let LocalReturnObject = { KTF: false, KReason: "", JsonData: {} };

    if (LocalDataPK > 0) {
        let LocalFromJsonData = await CommonFromRowPK.AsJsonAsyncAsObject({
            inJsonConfig,
            inItemName: LocalItemName,
            inRowPK,
            inDataPK: LocalDataPK
        });

        if (LocalFromJsonData.KTF) {
            let LocalFromPrepareData = await CommonPrepareData.StartFunc({
                inData: LocalFromJsonData.JsonData,
                inItemName: LocalItemName, inDataPk: LocalDataPK
            });

            if (LocalFromPrepareData.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.JsonData = LocalFromPrepareData.DataFromServer;
            };
        };
    };

    return await LocalReturnObject;
};

exports.FromDataFolder = async ({ inJsonConfig, inItemConfig, inRowPK, inDataPK }) => {
    let LocalDataPK = inDataPK;
    //let LocalReturnObject;
    let LocalItemName = inItemConfig.inItemName;
    let LocalReturnObject = { KTF: false, KReason: "", JsonData: {} };

    if (LocalDataPK > 0) {
        let LocalFromJsonData = await CommonFromRowPK.AsJsonAsyncAsObject({
            inJsonConfig,
            inItemName: LocalItemName,
            inRowPK,
            inDataPK: LocalDataPK
        });
        //  console.log("bbbbbbbbb : ", LocalFromJsonData);
        if (LocalFromJsonData.KTF) {
            let LocalFromPrepareData = await CommonPrepareData.FromDataFolder({
                inData: LocalFromJsonData.JsonData,
                inJsonConfig, inItemConfig, inDataPK: LocalDataPK
            });

            if (LocalFromPrepareData.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.JsonData = LocalFromPrepareData.DataFromServer;
            };
        };
    };

    return await LocalReturnObject;
};

