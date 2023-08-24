let CommonFromFromJson = require("../PullDataFromFile/FromJson")

let StartFunc = ({ inDataPK }) => {
    let localInDataPK = inDataPK;

    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let localCommonFromJson = CommonFromFromJson.StartFunc();
    LocalReturnData = { ...localCommonFromJson };
    LocalReturnData.KTF = false;

    if (localCommonFromJson.KTF === false) {
        return LocalReturnData;
    };

    if (localInDataPK in localCommonFromJson.JsonData.data) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

let mockFunc = () => {
    StartFunc({ inDataPK: "1024" })
};
// mockFunc();


module.exports = { StartFunc };