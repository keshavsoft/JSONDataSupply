const fs = require("fs");
let CommongetDirectories = require("./getDirectories");
let CommonLoginDetails = require("../../LoginFolder/UserDataJsonFile/PullDataFromFile/FromJson")

// 16:{UserName: "KESHAV", PassWord: "KESHAV"}
let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONObject: {}, CreatedLog: {} };
    let LocalFromCommongetDirectoriesArray = CommongetDirectories.StartFunc();
    let LocalLoginDetails = CommonLoginDetails.StartFunc();
    console.log("LocalFromCommongetDirectoriesArray-", LocalLoginDetails);


    if (LocalLoginDetails.KTF === false) {
        LocalReturnData.KReason = LocalLoginDetails.KReason;

        return LocalReturnData;
    };

    LocalFromCommongetDirectoriesArray.forEach(element => {
        LocalReturnData.JSONObject[element] = LocalLoginDetails.JsonData[element];
    });
    LocalReturnData.KTF = true;
    console.log("LocalReturnData--", LocalReturnData);
    return LocalReturnData;

    // let LocalDataPath = `${LocalFromCommonFromCheck.JSONFolderPath}`;
    // let LocalReturnArray = fs.readdirSync(LocalDataPath).filter(function (file) {
    //     return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    // });

    // let LocalNumberArray = LocalReturnArray.map(element => parseInt(element));

    // let LocalFilterArray = LocalNumberArray.filter(element => {
    //     return isNaN(element) === false;
    // });

    // return LocalFilterArray;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData--", LocalData);
};

LocalMockFunc();

module.exports = { StartFunc };
