let CommonFromCheck = require("../Check");

let fs = require("fs-extra");
let CommonMockAllow = require("../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK,
        inFolderName: LocalFolderName
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };

    if (LocalFromCommonFromCheck.KTF) {
        LocalReturnData.KTF = false;
        LocalReturnData.AlreadrPresent = true;

        return LocalReturnData;
    };
    
    try {
        fs.mkdirSync(LocalReturnData.FolderPath, {
            recursive: true
        });

        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };
    return LocalReturnData;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Keshav32") {
        let LocalFrom = StartFunc({
            inFolderName: "Transactions",
            inDataPK: 416
        });

        console.log("LocalFrom : ", LocalFrom);
    };
};
// localMockFunc();

module.exports = { StartFunc };