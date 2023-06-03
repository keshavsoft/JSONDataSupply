let CommonFromPullData = require("../PullData/AsJson");
let CommonMockAllow = require("../../../../../../../../../MockAllow.json");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;

        LocalFromCommonFromPullData = await CommonFromPullData.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromPullData.KReason;
            return await LocalReturnObject;
        };
        //   console.log("LocalFromCommonFromPullData22222222 : ", LocalFromCommonFromPullData.JsonData);
        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if (inItemName in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        } else {
            LocalReturnObject.KReason = `Item Name : ${inItemName} is not found!`;
        };
    };

    return await LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K3") {
        let LocalMockData = require("./Check.json");
        StartFunc({ ...LocalMockData }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData.JsonData);
        });
    };
};

module.exports = {
    StartFunc
};