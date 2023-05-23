let CommonTableFuncs = require("../Save");
let CommonDataSupplyReturnDataFuncs = require("../../Fs/Config/Folders/Files/ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");
let CommonMock = require("../../MockAllow.json");

let CheckAndSave = async ({ inJsonConfig, inItemConfig, inDataPK, inPostData }) => {
    console.log("aaaaaaaaaa : ", inJsonConfig, inItemConfig, inDataPK, inPostData);

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

const LocalMockForSave = () => {
    let LocalMockData = require("./MockSave.json");

    CheckAndSave({
        inJsonConfig: LocalMockData.JsonConfig,
        inItemConfig: LocalMockData.ItemConfig,
        inDataPK: CommonMock.DataPK,
        inPostData: LocalMockData.inDataToSave
    }).then(
        (PromiseFromSave) => {
            console.log("PromiseFromSave : ", PromiseFromSave);
        }
    );

};

if (CommonMock.AllowMock) {
    LocalMockForSave();
};

module.exports = {
    CheckAndSave
};