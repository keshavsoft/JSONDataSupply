let CommonFromCheck = require("../Check");
let CommongetDirectories = require("../getDirectories");

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

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalFromCommongetDirectories = CommongetDirectories.AsObjects({ inFolderName, inDataPK });

    console.log("LocalFromCommongetDirectories : ", LocalFromCommongetDirectories);
    
    try {
        // fs.mkdirSync(LocalReturnData.FolderPath, {
        //     recursive: true
        // });

        LocalReturnData.KTF = true;
        LocalReturnData.KResult = "Created in Config";
        LocalReturnData.ConfigFolderCreated = true;
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