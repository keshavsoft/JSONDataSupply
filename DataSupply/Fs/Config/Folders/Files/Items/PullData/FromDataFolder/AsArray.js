let CommonPull = require("./Pull");
let CommonScreensWithRowCount = require("./AsTree/ScreensWithRowCount");

let StartFunc = async ({ inJsonConfig, inDataPk }) => {
    if (inDataPk > 0) {
        let LocalData = await CommonPull.StartFunc({ inJsonConfig, inDataPk });
        return await Object.keys(LocalData);
    };
};

let UsingFolderAndFile = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    //    console.log("inDataPk ----------- : ", inFolderName, inFileNameWithExtension, inDataPk);
    if (inDataPK > 0) {
        let LocalData = await CommonScreensWithRowCount.StartFunc({
            inFolderName, inFileNameWithExtension,
            inDataPk
        });

        return await Object.keys(LocalData);
    };
};

module.exports = {
    StartFunc,
    UsingFolderAndFile
};