let fs = require("fs");
let CommonFromCheck = require("../Check");

let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;
    // LocalReturnData.JsonFileName = LocalFromCheck.JsonFileName;
    // LocalReturnData.UserDataJsonFilePath = LocalFromCheck.UserDataJsonFilePath;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    try {
        let LocalDataFromFile = fs.readFileSync(LocalReturnData.UserDataJsonFilePath);
        let LocalJsonData = JSON.parse(LocalDataFromFile);

        if (("data" in LocalJsonData) === false) {
            LocalReturnData.KReason = `Data : Not Found in  ${LocalReturnData.JsonFileName}!`;

            return LocalReturnData;
        };
        LocalReturnData.KTF = true;
        LocalReturnData.JsonData = LocalJsonData;


    } catch (error) {

    };

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K1') {
        let LocalData = StartFunc();

        console.log('LocalData : ', LocalData);
    };
};

// let LocalMockForExistence = StartFunc();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { StartFunc };
