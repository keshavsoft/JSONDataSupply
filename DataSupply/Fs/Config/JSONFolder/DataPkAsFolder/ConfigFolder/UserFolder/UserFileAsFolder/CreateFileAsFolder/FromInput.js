let CommonFromCheck = require("../Check");
let CommonDisplayJsonFile = require("../DisplayJsonFile/CreateFile");

let fs = require("fs-extra");
let CommonMockAllow = require("../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = LocalCreateFolder({
        inDataPK: LocalinDataPK,
        inFileNameOnly,
        inFolderName: LocalFolderName
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };

    if (LocalFromCommonFromCheck.KTF) {
        CommonDisplayJsonFile.StartFunc({
            inDataPK: LocalinDataPK,
            inFileNameOnly,
            inFolderName: LocalFolderName
        });
    };

    return LocalReturnData;
};

let LocalCreateFolder = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK,
        inFileNameOnly,
        inFolderName: LocalFolderName
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };

    if (LocalFromCommonFromCheck.KTF) {
        LocalReturnData.KTF = false;
        LocalReturnData.AlreadrPresent = true;

        return LocalReturnData;
    };

    try {
        fs.mkdirSync(LocalReturnData.JsonFilePath, {
            recursive: true
        });

        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };
    return LocalReturnData;
};


if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav31") {
        let LocalFrom = StartFunc({
            inFolderName: "Transactions",
            inDataPK: 416
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};
// localMockFunc();

module.exports = { StartFunc };