let CommonCheckFile = require("./CheckFile");
let fs = require("fs");

let FromJsonFile = ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, FilePath: "", CreatedLog: {}, KReason: "", KData: [] };
    let LocalReturnDataFromFile = CommonCheckFile.ForPreLoadFile({ inUserPK });
    
    if (LocalReturnDataFromFile.KTF) {
        LocalReturnData.KData = JSON.parse(fs.readFileSync(LocalReturnDataFromFile.FilePath));
        LocalReturnData.KTF = true;
    } else {
        LocalReturnData.KReason = LocalReturnDataFromFile.KReason;
    };

    return LocalReturnData;
};

module.exports = { FromJsonFile };