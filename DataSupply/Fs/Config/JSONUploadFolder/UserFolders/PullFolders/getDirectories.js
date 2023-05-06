const fs = require("fs");
let CommonFromCheck = require("../../Check");

let StartFunc = () => {
    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence();

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = `${LocalFromCommonFromCheck.DataUploadPath}`;
    console.log("LocalDataPath : ", LocalDataPath, `${__dirname}/${LocalDataPath}`, __dirname);
    let LocalReturnArray = fs.readdirSync(`${__dirname}/${LocalDataPath}`).filter(function (file) {
        return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    });

    let LocalNumberArray = LocalReturnArray.map(element => parseInt(element));

    let LocalFilterArray = LocalNumberArray.filter(element => {
        return isNaN(element) === false;
    });

    return LocalFilterArray;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
    console.log("LocalData", LocalData);
};

LocalMockFunc();

module.exports = { StartFunc };
