let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommongetDirectories = require("../../../UserFolders/PullFolders/getDirectories");

let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonPullDataFromFile.StartFunc();
    LocalReturnData = { ...LocalFromCheck };

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalClubData({ inLoginData: LocalFromCheck.JsonData });

    return LocalReturnData;
};


let LocalClubData = ({ inLoginData }) => {
    let LocalFromDirs = CommongetDirectories.StartFunc();

    Object.entries(inLoginData).forEach(
        ([key, value]) => {
            let LoopInsideFind = LocalFromDirs.find(e => e === parseInt(key))
            value.SetupDone = false;

            if (LoopInsideFind === undefined === false) {
                value.SetupDone = true;

            };
        }
    );
};

// let LocalMockForExistence = StartFunc();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { StartFunc };
