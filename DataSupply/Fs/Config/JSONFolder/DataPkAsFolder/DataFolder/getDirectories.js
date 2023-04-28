const fs = require("fs");
let CommonFromCheck = require("./Check");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };
    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;

    return fs.readdirSync(LocalDataPath).filter(function (file) {
        return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    });
};


let LocalMockFunc = () => {
    let LocalData =  StartFunc({ inDataPK: 1022 });
    console.log("LocalData",LocalData);
};

// LocalMockFunc();

module.exports = { StartFunc };
