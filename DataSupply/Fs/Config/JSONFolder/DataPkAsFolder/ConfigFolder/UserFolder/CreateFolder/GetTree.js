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
    // console.log("jjjjj---:",LocalFromCommonFromCheck);

    LocalReturnData = { ...LocalFromCommonFromCheck };

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = "Folder not found..!";

        return LocalReturnData;
    };

    let LocalFromCommongetDirectories = await CommongetDirectories.AsObjects({ inFolderName, inDataPK });
    // console.log("llllll---:", LocalFromCommongetDirectories);

    if (Object.keys(LocalFromCommongetDirectories) > 0) {
        LocalReturnData.KReason = "Files are inside this folder!";
        return await LocalReturnData;
    };

    LocalReturnData.JsonData = LocalFromCommongetDirectories;
    LocalReturnData.KTF = true;

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