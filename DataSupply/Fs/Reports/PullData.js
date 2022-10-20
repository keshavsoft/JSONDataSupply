let path = require("path");
let CommonAbsolutePath = require("../DataPath");
//let CommonCreate=require(".")
let fs = require("fs");

let ReturnDataFromJson = ({ inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalFolderName = "Reports";
        let LocalFileName = "LedgerAuto.json";

        let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({ inPresentDirectory: `${path.resolve("")}` });
        let LocalDataFromJSON = fs.readFileSync(path.resolve(__dirname, `${LocalDataPath}/${inUserPK}/${LocalFolderName}/${LocalFileName}`));
        LocalReturnData = JSON.parse(LocalDataFromJSON);

        Object.freeze(LocalReturnData);

        return LocalReturnData;
    };
};

module.exports = { ReturnDataFromJson };