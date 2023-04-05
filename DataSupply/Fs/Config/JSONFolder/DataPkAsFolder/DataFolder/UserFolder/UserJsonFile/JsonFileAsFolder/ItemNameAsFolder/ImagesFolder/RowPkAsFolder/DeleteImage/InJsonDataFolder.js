let fs = require("fs");
let CommonCheckRowPkAsFolder = require("../CheckRowPkAsFolder");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inRowPk, inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCommonCheckRowPkAsFolder = CommonCheckRowPkAsFolder.ForExistence({ inFolderName, inFileNameOnly, inItemName, inRowPk, inDataPK });

    try {
        fs.rmdirSync(LocalFromCommonCheckRowPkAsFolder.RowPkAsFolderPath, { recursive: true });
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = "Images Folder not found!";
    };

    return LocalReturnData;
};

module.exports = { StartFunc };
