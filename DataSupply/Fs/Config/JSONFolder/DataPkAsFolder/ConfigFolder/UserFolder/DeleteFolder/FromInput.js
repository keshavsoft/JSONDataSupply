let CommonFromCheck = require("../Check");
let CommongetDirectories = require("../getDirectories");

let fs = require("fs-extra");
let CommonMockAllow = require("../../../../../../../MockAllow.json");

let StartFunc = async ({ inFolderName, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK,
        inFolderName: LocalFolderName
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalFromCommongetDirectories = await CommongetDirectories.AsObjects({ inFolderName, inDataPK });

    if (Object.keys(LocalFromCommongetDirectories) > 0) {
        LocalReturnData.KReason = "Files are inside this folder!";
        return await LocalReturnData;
    };

    try {
        fs.rm(LocalReturnData.FolderPath, {
            recursive: true
        });

        LocalReturnData.KTF = true;
        LocalReturnData.KResult = "Deleted in Config";
        LocalReturnData.ConfigFolderDeleted = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return await LocalReturnData;
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