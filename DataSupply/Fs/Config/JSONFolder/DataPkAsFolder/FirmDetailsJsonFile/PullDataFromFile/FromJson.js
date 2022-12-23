let fs = require("fs");
let CommonFromCheck = require("../Check");

let StartFunc = ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.FirmDetailsPath = LocalFromCommonFromCheck.FirmDetailsPath;

    try {
        let rawdata = fs.readFileSync(LocalReturnData.FirmDetailsPath);
        LocalReturnData.JsonData = JSON.parse(rawdata);
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let LocalMockFroStartFunc = async () => {
    let result = await StartFunc({ inDataPK: 16 });
    console.log("result : ", result);
};

// LocalMockFroStartFunc().then();

module.exports = { StartFunc };
