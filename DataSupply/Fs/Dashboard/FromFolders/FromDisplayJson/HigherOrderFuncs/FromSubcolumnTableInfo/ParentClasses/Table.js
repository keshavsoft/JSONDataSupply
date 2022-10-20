let path = require("path");
// let CommonFolders = require("../../../../../../Folders/Show");
// let CommonFiles = require("../../../../../../Files/PullData");
let CommonNewItems = require("../../../../../../Config/Folders/Files/Items/PullData/FromDisplayJson/HigherOrderFuncs/FromSubColumnTableInfo");
let CommonFolders = require("../../../../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../../../../Config/Folders/Files/PullData/ListFiles");

let StartFunc = async ({ inUserPK }) => {
    let LocalFoldersData = CommonFolders.StartFunc({ inUserPK });
    let LocalFolderObject;
    let LocalReturnObject = {
        Folders: {}
    };

    LocalFoldersData.forEach(LoopFolderName => {
        LocalReturnObject.Folders[LoopFolderName] = {
            FolderName: LoopFolderName,
            Files: FuncsWithColumns.MainKeys({
                inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inUserPK }),
                inFolderName: LoopFolderName,
                inUserPK
            })
        };

        return LocalFolderObject;
    });

    return LocalReturnObject;
};

class FuncsWithColumns {
    static MainKeys = ({ inFolderName, inFilesArray, inUserPK }) => {
        let LocalReturnObject = {};

        inFilesArray.forEach(LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: CommonNewItems.StartFunc({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK,
                    inFuncToRun: this.HigherOrderFuncToRun
                })
            };
        });

        return LocalReturnObject;
    };

    static HigherOrderFuncToRun1 = ({ inData }) => {
        let LocalLoopObject = {};
        let LocalReturnObject = {};

        LocalLoopObject = {};

        // console.log("inData : ", inData);

        if ("ParentClasses" in inData) {
            if ("Table" in inData.ParentClasses) {

                console.log("inData : ", inData.ParentClasses.Table);


                LocalLoopObject.CardClass = inData.ParentClasses.Table.CardClass;
            }
        };
        console.log("LocalLoopObject : ", LocalLoopObject);
        //   LocalReturnObject[key] = LocalLoopObject;

        return LocalReturnObject;
    };

    static HigherOrderFuncToRun = ({ inData }) => {
        let LocalReturnObject = {};

        Object.entries(inData).forEach(
            ([key, value]) => {
                LocalReturnObject[key] = {
                    SubTableColumnName: key,
                    CardClass: ""
                };

                if ("ParentClasses" in value.TableInfo) {
                    if ("Table" in value.TableInfo.ParentClasses) {
                        LocalReturnObject[key].CardClass = value.TableInfo.ParentClasses.Table.CardClass;
                    }
                };
            }
        );

        return LocalReturnObject;
    };
};

module.exports = {
    StartFunc
};