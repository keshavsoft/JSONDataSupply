let fs = require("fs");
let CommonFromCheck = require("../Check");

let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    LocalReturnData.JsonFileName = LocalFromCheck.JsonFileName;

    LocalReturnData.UserDataJsonFilePath = LocalFromCheck.UserDataJsonFilePath;

    if (LocalFromCheck.KTF === false) {
        LocalReturnData.KReson = `${LocalReturnData.JsonFileName} File Not Found!`;

        return LocalReturnData;
    };

    try {
       let LocalDataFromFile = fs.readFileSync(LocalReturnData.UserDataJsonFilePath);
        let LocalJsonData = JSON.parse(LocalDataFromFile);

        if (("data" in LocalJsonData) === false) {
            LocalReturnData.KReson = `Data : Not Found in  ${LocalReturnData.JsonFileName}!`;

            return LocalReturnData;
        };

           LocalReturnData.JsonData = LocalJsonData.data;
      

    } catch (error) {

    };

    return LocalReturnData;
};



// let LocalMockForExistence = StartFunc();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { StartFunc };
