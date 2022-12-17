let CommonFromFirmDetailsJsonFile = require("../../../FirmDetailsJsonFile/Check");
let CommonFromCheck = require("./Check");

let fs = require("fs-extra");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromFirmDetailsJsonFile = CommonFromFirmDetailsJsonFile.ForExistence({ inDataPK });

    if (LocalFromFirmDetailsJsonFile.KTF) {
        LocalReturnData.KReason = LocalFromFirmDetailsJsonFile.KReason;

        return await LocalReturnData;
    };

    let LocalFrom = CommonFromCheck.ReturnDirectories();

    if (LocalFrom.FirmDetailsJsonFileIsPresent === false) {
        LocalReturnData.KReason = LocalFrom.KReason;

        return await LocalReturnData;
    };

    fs.copyFileSync(LocalFrom.FirmDetailsJsonFilePath, `${LocalFromFirmDetailsJsonFile.DataPKPath}/FirmDetails.json`);
    LocalReturnData.KTF = true;
    console.log("aaaaaaa L : ", LocalFromFirmDetailsJsonFile);

    return await LocalReturnData;
};

// StartFunc({ inDataPK: 1016 }).then(p => {

//     console.log("FromStartFunc : ", p);

// });

module.exports = { StartFunc };
