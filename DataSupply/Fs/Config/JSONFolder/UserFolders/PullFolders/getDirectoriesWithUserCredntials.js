let CommongetDirectories = require("./getDirectories");
let CommonLoginDetails = require("../../LoginFolder/UserDataJsonFile/PullDataFromFile/FromJson")

// 16:{UserName: "KESHAV", PassWord: "KESHAV"}
let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONObject: {}, CreatedLog: {} };
    let LocalFromCommongetDirectoriesArray = CommongetDirectories.StartFunc();
    let LocalLoginDetails = CommonLoginDetails.StartFunc();

    if (LocalLoginDetails.KTF === false) {
        LocalReturnData.KReason = LocalLoginDetails.KReason;

        return LocalReturnData;
    };

    LocalFromCommongetDirectoriesArray.forEach(element => {
        LocalReturnData.JSONObject[element] = {};
        if (element in LocalLoginDetails.JsonData) {
            LocalReturnData.JSONObject[element] = LocalLoginDetails.JsonData[element];

        };
    });
    LocalReturnData.KTF = true;
    return LocalReturnData;

};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData--", LocalData);
};

// LocalMockFunc();

module.exports = { StartFunc };
