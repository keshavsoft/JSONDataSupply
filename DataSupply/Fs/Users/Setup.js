let fs = require("fs");
let CommonAbsolutePath = require("../DataPath");

let KDataFolder = async ({ inDataPk }) => {
    let LocalReturnObject = { KTF: false, kPK: 0, KUserName: "" };
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();

    return await LocalReturnObject;
};

module.exports = { KDataFolder };