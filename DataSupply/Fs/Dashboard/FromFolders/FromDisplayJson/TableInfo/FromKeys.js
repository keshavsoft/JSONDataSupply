let path = require("path");
//let CommonFolders = require("../../../../Folders/Show");
//let CommonFiles = require("../../../../Files/PullData");
let CommonNewItems = require("../../../../Config/Folders/Files/Items/PullData/FromDisplayJson/TableInfo/FromKeys");
let CommonFolders = require("../../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../../Config/Folders/Files/PullData/ListFiles");

let ColumnReOrder = async ({ inUserPK }) => {
    let LocalFoldersData = CommonFolders.StartFunc({ inUserPK });
    let LocalFolderObject;
    let LocalReturnObject = {
        Folders: {}
    };

    LocalFoldersData.forEach(LoopFolderName => {
        LocalReturnObject.Folders[LoopFolderName] = {
            FolderName: LoopFolderName,
            Files: FuncsWithColumns.PullFiles({
                inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inUserPK }),
                inFolderName: LoopFolderName,
                inUserPK
            })
        };

        return LocalFolderObject;
    });

    return LocalReturnObject;
};

let MainKeys = async ({ inUserPK }) => {
    let LocalFoldersData = CommonFolders.StartFunc({ inUserPK });
    let LocalFolderObject;
    let LocalReturnObject = {
        Folders: {}
    };

    LocalFoldersData.forEach(LoopFolderName => {
        LocalReturnObject.Folders[LoopFolderName] = {
            FolderName: LoopFolderName,
            Files: FuncsWithColumns.MainKeys({
                inFilesArray: CommonFiles.getFilesAsArray({ inFolderName: LoopFolderName, inUserPK }),
                inFolderName: LoopFolderName,
                inUserPK
            })
        };

        return LocalFolderObject;
    });

    return LocalReturnObject;
};

class FuncsWithColumns {
    static PullFiles = ({ inFolderName, inFilesArray, inUserPK }) => {
        let LocalReturnObject = {};

        inFilesArray.forEach(LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: CommonNewItems.RowsAsObjectsWithColumns({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK
                })
            };
        });

        return LocalReturnObject;
    };

    static MainKeys = ({ inFolderName, inFilesArray, inUserPK }) => {
        let LocalReturnObject = {};

        inFilesArray.forEach(LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: CommonNewItems.MainKeys({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK
                })
            };
        });

        return LocalReturnObject;
    };
};

module.exports = {
    ColumnReOrder,
    MainKeys
};