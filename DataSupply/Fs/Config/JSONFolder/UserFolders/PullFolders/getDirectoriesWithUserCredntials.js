const fs = require("fs");
let CommongetDirectories = require("./getDirectories");


let StartFunc = () => {
    let LocalFromCommonFromCheck = CommongetDirectories.StartFunc();
    console.log("LocalFromCommonFromCheck",LocalFromCommonFromCheck);

    // if (LocalFromCommonFromCheck.KTF === false) {
    //     return [];
    // };

    // let LocalDataPath = `${LocalFromCommonFromCheck.JSONFolderPath}`;
    // let LocalReturnArray = fs.readdirSync(LocalDataPath).filter(function (file) {
    //     return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    // });

    // let LocalNumberArray = LocalReturnArray.map(element => parseInt(element));

    // let LocalFilterArray = LocalNumberArray.filter(element => {
    //     return isNaN(element) === false;
    // });

    // return LocalFilterArray;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc();
};

LocalMockFunc();

module.exports = { StartFunc };
