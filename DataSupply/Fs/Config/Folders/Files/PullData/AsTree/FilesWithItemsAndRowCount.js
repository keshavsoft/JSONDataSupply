let CommonListFiles = require("../ListFiles");
let CommonItems = require("../../Items/PullData/FromDataFolder/WithRowCountAndScreens");

let StartFunc = async ({ inFolderName, inDataPK }) => {
    let LocalFilesArray = CommonListFiles.StartFunc({ inFolderName, inDataPk: inDataPK });

    let LocalReturnData
    //let LocalLoopObject = {};
    let LocalReturnObject = {};
    let LocalJsonConfig = {};

    LocalReturnData = await Promise.all(LocalFilesArray.map(async (LoopFileName, LoopIndex) => {
        let LocalLoopObject = {};
        LocalLoopObject.FileName = LoopFileName;
        LocalLoopObject.FileNameHtmlId = `File${LoopIndex}`;

        LocalJsonConfig = {
            inFolderName,
            inJsonFileName: LoopFileName
        };

        let LocalLoopItems = await CommonItems.AsTree({
            inJsonConfig: LocalJsonConfig,
            inDataPK
        });

        LocalLoopObject.Items = LocalLoopItems

        LocalReturnObject[LocalLoopObject.FileNameHtmlId] = LocalLoopObject;
    }));

    return await LocalReturnObject;
};

module.exports = {
    StartFunc
};