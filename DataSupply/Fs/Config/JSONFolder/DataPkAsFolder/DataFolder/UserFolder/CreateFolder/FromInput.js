let CommonFromCheck = require("../Check");
let fs = require("fs");
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

    if (LocalFromCommonFromCheck.DataPkAsFolderPresent === true & LocalFromCommonFromCheck.KTF === false) {
        try {
            fs.mkdirSync(LocalReturnData.FolderPath, {
                recursive: true
            });

            LocalReturnData.KTF = true;
            LocalReturnData.KResult = "Created in Data";
            LocalReturnData.DataFolderCreated = true;
        } catch (error) {
            LocalReturnData.KReason = error;
        };
    };

    return LocalReturnData;
};

let LocalMockFuncForStartFunc = () => {
    let LocalFromStartFunc = StartFunc({ inFolderName: "Trans", inDataPK: 601 });
    console.log("LocalFromStartFunc : ", LocalFromStartFunc);
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

module.exports = { StartFunc };
