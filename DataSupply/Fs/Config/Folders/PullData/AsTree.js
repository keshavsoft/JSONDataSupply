let path = require("path");
//let CommonFolders = require("../../../Folders/Show");
//let CommonFiles = require("../../../Files/PullData");
//let CommonNewItems = require("../../../Config/Folders/Files/Items/PullData/ForSubTableColumns/Toggles");
//let CommonFiles = require("../../../Config/Folders/Files/PullData/ListFiles");
//let CommonFolders = require("../../../Config/Folders/PullData/getDirectories");
let CommonFolders = require("./getDirectories");
let CommonFiles = require("../Files/PullData/ListFiles");
let CommonNewItems = require("../Files/Items/PullData/FromDataFolder/AsArray");

class FuncsWithColumns {
    static PullFiles = async ({ inFolderName, inFilesArray, inDataPk }) => {
        let LocalReturnObject = {};

        await Promise.all(inFilesArray.map(async (LoopFileName, LoopIndex) => {
            let LoopLocalItems = await CommonNewItems.UsingFolderAndFile({
                inFolderName,
                inFileNameWithExtension: LoopFileName,
                inDataPk
            });

            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                FileNameHtmlId: `File${LoopIndex}`,
                Items: LoopLocalItems
            };
        }));
//        console.log("LocalReturnObject : ", LocalReturnObject);
        return await LocalReturnObject;
    }
};

let TillItems = async ({ inDataPk }) => {
    let LocalFoldersData = CommonFolders.StartFunc({ inDataPk });
    let LocalFolderObject;
    let LocalReturnObject = {
        Folders: {}
    };

    await Promise.all(LocalFoldersData.map(async (LoopFolderName, LoopIndex) => {
        let LoopLocalFiles = await FuncsWithColumns.PullFiles({
            inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inDataPk }),
            inFolderName: LoopFolderName,
            inDataPk
        });

        LocalReturnObject.Folders[LoopFolderName] = {
            FolderName: LoopFolderName,
            FolderHtmlId: `Folder${LoopIndex}`,
            Files: LoopLocalFiles
        };
    }));

    return await LocalReturnObject;
};

module.exports = { TillItems };