const fs = require("fs");
let CommonFromCheck = require("../Check");

let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };
    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;

    return fs.readdirSync(LocalDataPath).filter(function (file) {
        return fs.statSync(`${LocalDataPath}/${file}`).isDirectory();
    });
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSN') {
        let LocalData = StartFunc({ inDataPK: CommonMock.DataPK });
        console.log("LocalData", LocalData);
    };
};


module.exports = { StartFunc };
