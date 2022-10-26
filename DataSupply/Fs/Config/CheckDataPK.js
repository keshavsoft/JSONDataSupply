let fs = require("fs");
let CommonAbsolutePath = require("../DataPath");

let ForExistence = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DataPKPath: "", KReason: "" };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.DataPKPath = `${GlobalDataPath}/${inDataPK}`

    try {
        if (fs.statSync(LocalReturnData.DataPKPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {
        LocalReturnData.KReason = `${inDataPK} : Data folder not found!`;
    };

    return LocalReturnData;
};

module.exports = { ForExistence };
