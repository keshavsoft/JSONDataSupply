let path = require("path");
//let CommonFolders = require("../../../Folders/Show");
//let CommonFiles = require("../../../Files/PullData");
let CommonNewItems = require("../../../Config/Folders/Files/Items/PullData/FromDisplayJson/AsTree");
let CommonFolders = require("../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../Config/Folders/Files/PullData/ListFiles");


class FuncsWithColumns {
    static AsTreeWithColumns = async ({ inUserPK, inFromKey, inKeyToPull  }) => {
        let LocalFoldersData = CommonFolders.StartFunc({ inUserPK });
        let LocalFolderObject;
        let LocalReturnObject = {
            Folders: {}
        };

        LocalFoldersData.forEach(LoopFolderName => {
            LocalReturnObject.Folders[LoopFolderName] = {
                FolderName: LoopFolderName,
                Files: this.PullFiles({
                    inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inUserPK }),
                    inFolderName: LoopFolderName,
                    inUserPK,
                    inFromKey, inKeyToPull 
                })
            };

            return LocalFolderObject;
        });

        return LocalReturnObject;
    };

    static PullFiles = ({ inFolderName, inFilesArray, inUserPK, inFromKey, inKeyToPull  }) => {
        let LocalReturnObject = {};

        inFilesArray.forEach(LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: CommonNewItems.RowsAsObjectsWithColumns({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK,
                    inFromKey, inKeyToPull 
                })
            };
        });

        return LocalReturnObject;
    }
};

module.exports = { AsTreeWithColumns: FuncsWithColumns.AsTreeWithColumns };