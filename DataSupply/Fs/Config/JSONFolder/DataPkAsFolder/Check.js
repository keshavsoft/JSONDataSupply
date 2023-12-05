let fs = require("fs");
let CommonCheck = require("../Check");
// let CommonFirmDetailsJsonFile = require("./FirmDetailsJsonFile/PullDataFromFile/FromJson");
let CommonMock = require("../../../../MockAllow.json");

let ForExistence = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromForFolderExistence = CommonCheck.ForJSONFolderExistence();

    LocalReturnData = { ...LocalFromForFolderExistence };
    LocalReturnData.KTF = false;

    LocalReturnData.DataPKPath = `${LocalReturnData.KDataJSONFolderPath}/${inDataPK}`;

    if (LocalFromForFolderExistence.KTF === false) {
        return LocalReturnData;
    };
    console.log("JsonData :----------- ");
    try {
        if (fs.statSync(LocalReturnData.DataPKPath).isDirectory()) {

            // console.log("JsonData :-----------11111111111 ");

            // let LocalFirmDetailsJsonFile = CommonFirmDetailsJsonFile.StartFunc({ inDataPK });
            // console.log("LocalFirmDetailsJsonFile : ", LocalFirmDetailsJsonFile);

            // if (LocalFirmDetailsJsonFile.KTF) {
            //     console.log("JsonData : ", LocalFirmDetailsJsonFile.JsonData.Firm);
            // };

            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `DataPK : ${inDataPK}: Folder not found!`;
        };
    } catch (error) {
        LocalReturnData.KReason = `DataPK : ${inDataPK}: Folder not found!`;
    };

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K05') {
        let LocalData = ForExistence({
            inDataPK: CommonMock.DataPK
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { ForExistence };
