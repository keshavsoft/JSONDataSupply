let path = require("path");
let CommonFolders = require("../Folders/Show");
let CommonFiles = require("../Files/PullData");
let CommonItems = require("../Data/Items/PullData");

let FuncsWithColumns = {
    AsTreeWithColumns: async ({ inUserPK }) => {
        let LocalFoldersData = CommonFolders.AsTree({ inUserPK });
        let LocalFolderObject;

        return LocalFoldersData.map(LoopFolderName => {
            LocalFolderObject = {
                FolderName: LoopFolderName,
                Files: FuncsWithColumns.PullFiles({
                    inFilesArray: CommonFiles.getFilesAsArray({ inFolderName: LoopFolderName, inUserPK }),
                    inFolderName: LoopFolderName,
                    inUserPK
                })
            };

            return LocalFolderObject;
        });
    },
    PullFiles: ({ inFolderName, inFilesArray, inUserPK }) => {
        let LocalFileObject;

        return inFilesArray.map(LoopFileName => {
            LocalFileObject = {
                FileName: LoopFileName,
                FileNameId: `File-${path.parse(LoopFileName).name}`,
                Items: CommonItems.RowsAsObjectsWithColumns({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK
                })
            };

            return LocalFileObject;
        });
    }
};

let AsTree = async ({ inUserPK }) => {
    let LocalFoldersData = CommonFolders.AsTree({ inUserPK });
    let LocalFolderObject;

    return LocalFoldersData.map(LoopFolderName => {
        LocalFolderObject = {
            FolderName: LoopFolderName,
            Files: PullFiles({
                inFilesArray: CommonFiles.getFilesAsArray({ inFolderName: LoopFolderName, inUserPK }),
                inFolderName: LoopFolderName,
                inUserPK
            })
        };

        return LocalFolderObject;
    });
};

let getDirectories = async ({ inUserPK }) => {
    let LocalReturnArray = await AsTree({ inUserPK });

    return await LocalReturnArray;
};

let ForAdmin = async ({ inUserPK }) => {
    let LocalReturnArray = await FuncsWithColumns.AsTreeWithColumns({ inUserPK });

    return await LocalReturnArray;
};


let PullFiles = ({ inFolderName, inFilesArray, inUserPK }) => {
    let LocalFileObject;

    return inFilesArray.map(LoopFileName => {
        LocalFileObject = {
            FileName: LoopFileName,
            FileNameId: `File-${path.parse(LoopFileName).name}`,
            Items: CommonItems.RowsAsObjects({
                inFolderName,
                inFileNameWithExtension: LoopFileName,
                inUserPK
            })
        };

        return LocalFileObject;
    });
};

module.exports = { getDirectories, AsTree, ForAdmin };