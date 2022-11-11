const fs = require("fs");
let CommonCheck = require("../../Check/InDataFolder/Check");

let StartFunc = ({ inDataPK, inFolderName }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = CommonCheck.ForExistence({ inFolderName, inDataPk: inDataPK });

    LocalReturnData.DirPath = LocalFromCheck.DirPath;

    if (LocalFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.KResult = fs.readdirSync(LocalReturnData.DirPath).filter(function (file) {
        return file;
    });
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc({
        inFolderName: "Loans",
        inDataPK: 2051
    });

    console.log("folder data: LocalData : ", LocalData);
};

//LocalMockFunc();

module.exports = {
    StartFunc
};
