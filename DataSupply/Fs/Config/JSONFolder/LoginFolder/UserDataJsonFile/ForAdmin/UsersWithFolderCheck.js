let CommonFromPullDataFromFile = require("../PullDataFromFile/FromJson");
// let CommonFromgetDirectories = require("../../../UserFolders/PullFolders/getDirectories");
let CommonFromgetDirectories = require("../../../../JSONUploadFolder/UserFolders/PullFolders/getDirectories");

// 16:{UserName: "KESHAV", PassWord: "KESHAV"}
let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONObject: {}, CreatedLog: {} };
    let LocalFromJson = CommonFromPullDataFromFile.StartFunc();
    LocalReturnData = { ...LocalFromJson };

    if (LocalFromJson.KTF === false) {
        delete LocalReturnData.JsonData;
        return LocalReturnData;
    };

    let LocalFromData = LocalFromJson.JsonData;

    LocalFuncFromDir({ inLoginData: LocalFromData });

    LocalReturnData.LoginData = LocalFromData;
    delete LocalReturnData.JsonData;

    LocalReturnData.KTF = true;
    return LocalReturnData;

};

let LocalFuncFromDir = ({ inLoginData }) => {
    let LocalFromDirData = CommonFromgetDirectories.StartFunc();

    Object.entries(inLoginData).forEach(
        ([key, value]) => {
            value.FolderPresent = true;
            if (LocalFromDirData.find(e => e === parseInt(key)) === undefined) {
                value.FolderPresent = false;
            };
        }
    );
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData--", LocalData);
};

LocalMockFunc();

module.exports = { StartFunc };
