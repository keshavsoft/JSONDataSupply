let path = require("path");
let CommonFolders = require("../Folders/Show");
//let CommonFiles = require("../Files/PullData");

let CommonFilesWithData = require("../Files/WithData/PullData");

let CommonItems = require("../Data/Items/PullData");

let AsTree = async ({ inUserPK }) => {
    let LocalFoldersData = CommonFolders.AsTree({ inUserPK });
    let LocalFolderObject;

    return LocalFoldersData.map(LoopFolderName => {
        LocalFolderObject = {
            FolderName: LoopFolderName,
            Files: PullFiles({
                inFilesArray: CommonFilesWithData.getFilesAsArray({ inFolderName: LoopFolderName, inUserPK }),
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

let PullFiles = ({ inFolderName, inFilesArray, inUserPK }) => {
    let LocalFileObject;

    return inFilesArray.map(LoopFileName => {
        LocalFileObject = {
            FileName: LoopFileName,
            FileNameId: `File-${path.parse(LoopFileName).name}`,
            Items: CommonItems.RowsAsObjectsWithData({
                inFolderName,
                inFileNameWithExtension: LoopFileName,
                inUserPK
            })
        };

        return LocalFileObject;
    });
};

module.exports = { getDirectories, AsTree };