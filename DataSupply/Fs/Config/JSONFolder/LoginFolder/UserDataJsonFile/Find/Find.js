let CommonFromFromJson = require("../PullDataFromFile/FromJson")

let StartFunc = ({ inDataPK }) => {
    let localInDataPK = inDataPK;

    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    localCommonFromJson = CommonFromFromJson.StartFunc();

    if (localCommonFromJson.KTF === false) {
        LocalReturnData.KReason = localCommonFromJson.KReason
        return LocalReturnData;
    };

    if (localInDataPK in localCommonFromJson.JsonData) {
        LocalReturnData.KTF = true;
    };
    return LocalReturnData;

};

let mockFunc = () => {
    StartFunc({ inDataPK: "1024" })
};
// mockFunc();


module.exports = { StartFunc };