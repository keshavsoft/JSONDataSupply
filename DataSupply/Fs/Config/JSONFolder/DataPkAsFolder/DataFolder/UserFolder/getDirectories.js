const fs = require("fs");
let CommonFromCheck = require("./Check");


let AsArray =  ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};



let LocalMockFunc =  () => {
    let LocalData =  AsArray({
        inDataPK: 1022,
        inFolderName: "Transactions"
    });
    console.log("LocalData",LocalData);
};

// LocalMockFunc();

module.exports = { AsArray };
