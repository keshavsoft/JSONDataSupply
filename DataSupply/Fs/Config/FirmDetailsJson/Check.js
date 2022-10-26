let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonCheckDataPK = require("../CheckDataPK");

let ForExistence = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFileName = "FirmDetails.json";

    if (LocalDataPK > 0) {
        let LocalFromCommonCheckDataPK = CommonCheckDataPK.ForExistence({ inDataPK: inDataPK });

        if (LocalFromCommonCheckDataPK.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonCheckDataPK.KReason;

            return LocalReturnData;
        };

        let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
        LocalReturnData.FilePath = `${GlobalDataPath}/${LocalDataPK}/${LocalFileName}`
        try {
            if (fs.existsSync(LocalReturnData.FilePath)) {
                LocalReturnData.KTF = true;
            };
        } catch (error) {

        };
    }
    return LocalReturnData;
};

module.exports = { ForExistence };
