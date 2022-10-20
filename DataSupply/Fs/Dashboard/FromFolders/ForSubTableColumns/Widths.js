let path = require("path");
//let CommonFolders = require("../../../Folders/Show");
//let CommonFiles = require("../../../Files/PullData");
let CommonNewItems = require("../../../Config/Folders/Files/Items/PullData/ForSubTableColumns/Widths");
let CommonFolders = require("../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../Config/Folders/Files/PullData/ListFiles");

class FuncsWithColumns {
    static PullFiles = ({ inFolderName, inFilesArray, inUserPK, inKeysArrayNeeded }) => {
        let LocalReturnObject = {};
        let LocalFromItems;

        inFilesArray.forEach(LoopFileName => {
            LocalFromItems = CommonNewItems.RowsAsObjectsWithColumns({
                inFolderName,
                inFileNameWithExtension: LoopFileName,
                inUserPK,
                inKeysArrayNeeded
            });

            //  console.log("LocalFromItems : ", LocalFromItems);

            if (Object.keys(LocalFromItems).length > 0) {
                LocalReturnObject[path.parse(LoopFileName).name] = {
                    FileName: LoopFileName,
                    Items: LocalFromItems
                };
            };
        });

        return LocalReturnObject;
    }

    static PullFiles1 = ({ inFolderName, inFilesArray, inUserPK, inKeysArrayNeeded }) => {
        let LocalReturnObject = {};
        let LocalFromItems;

        inFilesArray.forEach(LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: CommonNewItems.RowsAsObjectsWithColumns({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK,
                    inKeysArrayNeeded
                })
            };
        });

        return LocalReturnObject;
    }
};

let AsTreeWithColumns = async ({ inUserPK, inKeysArrayNeeded }) => {
    let LocalFoldersData = CommonFolders.StartFunc({ inUserPK });
    let LocalFolderObject;
    let LocalReturnObject = {
        Folders: {}
    };
    let LocalFromPullFiles;

    LocalFoldersData.forEach(LoopFolderName => {
        LocalFromPullFiles = FuncsWithColumns.PullFiles({
            inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inUserPK }),
            inFolderName: LoopFolderName,
            inUserPK,
            inKeysArrayNeeded
        });

        if (Object.keys(LocalFromPullFiles).length > 0) {
            LocalReturnObject.Folders[LoopFolderName] = {
                FolderName: LoopFolderName,
                Files: LocalFromPullFiles
            };
        };

        return LocalFolderObject;
    });

    return LocalReturnObject;
};

module.exports = { AsTreeWithColumns };